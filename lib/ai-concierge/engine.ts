
import {  getVehicles, getFeaturedVehicles, getInventoryStats } from "@/services/vehicle.service";
import type { Vehicle } from "@/types/vehicle";

/* ============================================================================
   TYPES
============================================================================ */

export type Intent =
  | "greeting"
  | "search"
  | "vehicle"
  | "finance"
  | "availability"
  | "compare"
  | "human"
  | "general";

/**
 * Local shape for the image objects on Vehicle.images — adjust field names
 * (url/alt) to match your actual VehicleImage type if it differs.
 */
interface VehicleImage {
  id: string;
  url: string;
  alt?: string;
}

type VehicleWithImages = Vehicle & { images?: VehicleImage[] };

export interface VehicleCardData {
  id: string;
  slug: string;
  name: string;
  year: number;
  priceLabel: string;
  priceValue: number;
  mileageLabel: string;
  fuelType: string;
  transmission: string;
  status: string;
  image: string;
  href: string;
  emiLabel?: string;
  match?: number;
  reason?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  vehicle?: VehicleCardData;
  suggestions?: string[];
  showActions?: boolean;
}

export interface ConciergeContext {
  /** id of the last vehicle shown, so "is it available?" resolves correctly */
  lastVehicleId?: string;
}

export interface ConciergeReply {
  content: string;
  vehicle?: VehicleCardData;
  suggestions: string[];
  showActions?: boolean;
  nextVehicleId?: string;
}

/* ============================================================================
   FORMATTING
============================================================================ */

export function formatBDT(amount: number): string {
  if (amount >= 1_00_00_000) return `৳${trimTrailing(amount / 1_00_00_000)} Crore`;
  if (amount >= 1_00_000) return `৳${trimTrailing(amount / 1_00_000)} Lakh`;
  return `৳${amount.toLocaleString("en-BD")}`;
}

function trimTrailing(n: number): string {
  return n % 1 === 0 ? n.toString() : n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function capitalize(v: string): string {
  return v ? v.charAt(0).toUpperCase() + v.slice(1) : v;
}

/** Rough estimated monthly payment — clearly labeled as an estimate, not a quote. */
function estimateEmi(price: number, downPaymentPct = 20, months = 60, annualRatePct = 9): string {
  const principal = price * (1 - downPaymentPct / 100);
  const r = annualRatePct / 12 / 100;
  const payment = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return `Est. ${formatBDT(Math.round(payment))}/mo`;
}

function toCard(vehicle: Vehicle, extra?: { match?: number; reason?: string }): VehicleCardData {
  const name = [vehicle.brand, vehicle.model, vehicle.trim].filter(Boolean).join(" ");
  const images = (vehicle as VehicleWithImages).images;

  return {
    id: vehicle.id,
    slug: vehicle.slug,
    name,
    year: vehicle.year,
    priceLabel: formatBDT(vehicle.price),
    priceValue: vehicle.price,
    mileageLabel: `${vehicle.mileageKm.toLocaleString("en-BD")} km`,
    fuelType: capitalize(vehicle.fuelType),
    transmission: capitalize(vehicle.transmission),
    status: capitalize(vehicle.status),
    image: images?.[0]?.url ?? "/images/cars/placeholder.jpg",
    href: `/inventory/${vehicle.slug}`,
    emiLabel: vehicle.status === "available" ? estimateEmi(vehicle.price) : undefined,
    match: extra?.match,
    reason: extra?.reason,
  };
}

/* ============================================================================
   INVENTORY HELPERS (real data, computed in-memory)
============================================================================ */

let inventoryCache: Vehicle[] | null = null;
let inventoryCacheAt = 0;
const CACHE_MS = 60_000;

async function inventory(): Promise<Vehicle[]> {
  if (inventoryCache && Date.now() - inventoryCacheAt < CACHE_MS) return inventoryCache;
  const page = await getVehicles({ pageSize: 200, sortBy: "newest" });
  inventoryCache = page.items;
  inventoryCacheAt = Date.now();
  return inventoryCache;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function vehicleTokens(v: Vehicle): Set<string> {
  return new Set(tokenize(`${v.brand} ${v.model} ${v.trim ?? ""}`));
}

function nameScore(v: Vehicle, tokens: string[]): number {
  const vTokens = vehicleTokens(v);
  return tokens.reduce((hits, t) => hits + (vTokens.has(t) ? 1 : 0), 0);
}

/** "under 60 lakh" / "under 1.2 crore" → BDT amount */
function parseBudgetCeiling(text: string): number | undefined {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(lakh|lac|crore|cr)/i);
  if (!match) return undefined;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit.startsWith("cr") ? value * 1_00_00_000 : value * 1_00_000;
}

const BODY_TYPES = ["suv", "sedan", "hatchback", "coupe", "crossover", "pickup", "truck", "van"];

function parseBodyType(text: string): string | undefined {
  return BODY_TYPES.find((b) => text.includes(b));
}

async function findVehicleByName(tokens: string[]): Promise<Vehicle | undefined> {
  const list = await inventory();
  let best: { v: Vehicle; score: number } | undefined;
  for (const v of list) {
    const score = nameScore(v, tokens);
    if (score > 0 && (!best || score > best.score)) best = { v, score };
  }
  return best?.v;
}

async function searchInventory(text: string): Promise<{ results: Vehicle[]; reason: string }> {
  const list = await inventory();
  const budget = parseBudgetCeiling(text);
  const bodyType = parseBodyType(text);
  const sporty = /(sporty|performance|fast)/.test(text);

  let results = list.filter((v) => v.status === "available");
  let reason = "Popular in current inventory";

  if (budget) {
    results = results.filter((v) => v.price <= budget);
    reason = `Fits your ${formatBDT(budget)} budget`;
  }
  if (bodyType) {
    results = results.filter((v) => v.bodyType?.toLowerCase() === bodyType);
    reason = `Matches your ${capitalize(bodyType)} preference`;
  }
  if (sporty) {
    results = results
      .filter((v) => ["coupe", "suv"].includes(v.bodyType?.toLowerCase() ?? ""))
      .sort((a, b) => b.price - a.price);
    reason = "Performance-leaning pick";
  }

  if (results.length === 0) results = list.filter((v) => v.status === "available").slice(0, 3);
  return { results: results.slice(0, 3), reason };
}

/* ============================================================================
   INTENT DETECTION
============================================================================ */

function detectIntent(text: string): Intent {
  if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening)\b/.test(text)) return "greeting";
  if (/(finance|financing|monthly|emi|loan|down payment)/.test(text)) return "finance";
  if (/(available|availability|in stock|still there|can i view)/.test(text)) return "availability";
  if (/(compare|comparison|\bvs\b|versus)/.test(text)) return "compare";
  if (/(human|agent|sales rep|representative|talk to someone)/.test(text)) return "human";
  if (/(find|looking for|want|need|budget|under |suv|sedan|hatchback|coupe|pickup)/.test(text)) return "search";
  return "general";
}

/* ============================================================================
   PUBLIC API
============================================================================ */

export async function getInitialGreeting(): Promise<{ content: string; suggestions: string[] }> {
  const [stats, featured] = await Promise.all([getInventoryStats(), getFeaturedVehicles(2)]);
  const names = featured.map((v) => `${v.brand} ${v.model}`);

  return {
    content: `Welcome to AutoStock. I'm your AI vehicle concierge — we currently have ${stats.totalAvailable} vehicles across ${stats.brandCount} brands in stock. Tell me what you're looking for and I'll narrow it down.`,
    suggestions: [
      "Find an SUV under ৳60 lakh",
      ...names.map((n) => `Tell me about the ${n}`),
      "Can I finance a vehicle?",
    ].slice(0, 4),
  };
}

export async function getConciergeReply(
  rawInput: string,
  context: ConciergeContext = {}
): Promise<ConciergeReply> {
  const text = rawInput.toLowerCase();
  const tokens = tokenize(rawInput);
  const intent = detectIntent(text);
  const namedVehicle = await findVehicleByName(tokens);

  // A specific named vehicle always wins, even if other keywords matched.
  if (namedVehicle && intent !== "finance" && intent !== "availability") {
    const card = toCard(namedVehicle);
    return {
      content: `The ${card.year} ${card.name} is listed at ${card.priceLabel}, with ${card.mileageLabel} on it, a ${card.transmission.toLowerCase()} gearbox running on ${card.fuelType.toLowerCase()}. It's currently ${card.status.toLowerCase()}.`,
      vehicle: card,
      suggestions: ["Is it still available?", "Can I finance it?", "Compare with another option"],
      nextVehicleId: namedVehicle.id,
    };
  }

  switch (intent) {
    case "greeting": {
      const g = await getInitialGreeting();
      return { ...g };
    }

    case "search": {
      const { results, reason } = await searchInventory(text);
      if (results.length === 0) {
        return {
          content: "I couldn't find a vehicle matching that in current inventory. Want me to widen the search?",
          suggestions: ["Show all available SUVs", "Show me sedans", "What's newest in stock?"],
        };
      }
      const first = toCard(results[0], { match: 90 + Math.min(results.length, 9), reason });
      return {
        content:
          results.length === 1
            ? `I found a strong match — the ${first.name} fits what you described.`
            : `I found ${results.length} vehicles that fit. I'd start with the ${first.name}, our closest match.`,
        vehicle: first,
        suggestions: ["Show me another option", "Compare these", "What about financing?"],
        nextVehicleId: results[0].id,
      };
    }

    case "availability": {
      const target = context.lastVehicleId
        ? (await inventory()).find((v) => v.id === context.lastVehicleId)
        : namedVehicle;
      if (!target) {
        return {
          content: "Which vehicle would you like me to check? Name the model and I'll confirm its status.",
          suggestions: ["Check the newest SUV", "Show available vehicles"],
        };
      }
      const card = toCard(target);
      return {
        content:
          target.status === "available"
            ? `Good news — the ${card.name} is currently marked available. I'd recommend confirming before you head to the showroom, since availability can shift.`
            : `The ${card.name} is currently marked ${card.status.toLowerCase()}. I can suggest similar available vehicles if you'd like.`,
        vehicle: card,
        suggestions: ["Book a viewing", "Show similar vehicles", "Ask about financing"],
        nextVehicleId: target.id,
      };
    }

    case "finance": {
      const target = context.lastVehicleId
        ? (await inventory()).find((v) => v.id === context.lastVehicleId)
        : namedVehicle;
      if (target) {
        const card = toCard(target);
        return {
          content: `For the ${card.name} at ${card.priceLabel}, a typical financing plan (20% down, 5-year term, ~9% p.a.) works out to roughly ${card.emiLabel}. Exact rates are confirmed by the financing provider.`,
          vehicle: card,
          suggestions: ["Adjust down payment", "Talk to a sales specialist", "Show finance-eligible cars"],
          nextVehicleId: target.id,
        };
      }
      return {
        content:
          "Financing is available on eligible vehicles. Tell me which one you're considering and I'll estimate a monthly payment.",
        suggestions: ["Estimate for the newest SUV", "Show finance-eligible cars", "Talk to a sales specialist"],
      };
    }

    case "compare": {
      const list = await inventory();
      const available = list.filter((v) => v.status === "available").slice(0, 3);
      const names = available.map((v) => `${v.brand} ${v.model}`);
      return {
        content: names.length
          ? `Here's a quick comparison across current stock: ${names.join(", ")}. Tell me two of these and I'll break down price, mileage, and spec side by side.`
          : "I don't have enough vehicles in stock right now to compare. Try again shortly.",
        suggestions: names.slice(0, 2).map((n) => `Compare ${n} in detail`),
      };
    }

    case "human":
      return {
        content:
          "Absolutely — I'll pass this conversation to a sales specialist, including the vehicles and questions we've covered so you won't need to repeat yourself.",
        suggestions: ["Connect me now", "Keep chatting with AI"],
        showActions: true,
      };

    default: {
      const stats = await getInventoryStats();
      return {
        content: `I can help with vehicle discovery, specs, availability, comparisons, and financing. We currently have ${stats.totalAvailable} vehicles in stock — what are you after?`,
        suggestions: ["Find a car for me", "Browse available SUVs", "Ask about financing"],
      };
    }
  }
}