"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import {
  ArrowRight,
  CarFront,
  Sofa,
  Flame,
  Zap,
  Heart,
  CalendarDays,
  Gauge,
  Fuel,
} from "lucide-react";
import { ACCENT, CHARCOAL, EDITORIAL_INK_LIGHT, EDITORIAL_SURFACE_LIGHT, PAPER } from "../ui/tokens";
// adjust to your actual path
import type { Vehicle } from "@/types/vehicle";
import { getFeaturedVehicles } from "@/services/vehicle.service";
import Link from "next/link";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

const EASE = [0.16, 1, 0.3, 1] as const;
const FAST: Transition = { duration: 0.3, ease: EASE };
const MED: Transition = { duration: 0.4, ease: EASE };
const IMAGE: Transition = { duration: 0.85, ease: EASE };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const iconHover: Variants = { hover: { scale: 1.08, rotate: -3 } };
const arrowHover: Variants = { hover: { x: 3 } };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  hover: { y: -4, transition: MED },
};

const imageScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.055 },
};

const heartPop: Variants = {
  idle: { scale: 1 },
  popped: { scale: [1, 1.3, 1], transition: MED },
};

const CATEGORIES = [
  { name: "SUV", icon: CarFront },
  { name: "Sedan", icon: Sofa },
  { name: "Sports", icon: Flame },
  { name: "Electric", icon: Zap },
] as const;

// Shape the card actually renders — mapped from your real Vehicle records.
interface CarCardData {
  id: string;
  name: string;
  price: string;
  year: string;
  transmission: string;
  fuel: string;
  image: string;
  slug: string;
}

const FEATURED_COUNT = 3;

function toCardData(vehicle: Vehicle): CarCardData {
  return {
    id: vehicle.id,
    slug: vehicle.slug,
    name: [vehicle.brand, vehicle.model, vehicle.trim]
      .filter(Boolean)
      .join(" "),
    price: `$${vehicle.price.toLocaleString()}`,
    year: String(vehicle.year),
    transmission: vehicle.transmission,
    fuel: vehicle.fuelType,
    image: vehicle.images?.[0]?.url ?? "",
  };
}

function buildTheme(dark: boolean) {
  return {
    bg: dark ? CHARCOAL : EDITORIAL_SURFACE_LIGHT,
    text: dark ? PAPER : EDITORIAL_INK_LIGHT,
    muted: dark ? PAPER : "#38342E",
    subtle: dark ? PAPER : "#454039",
    soft: dark ? PAPER : "#3E3932",

    panel: dark
      ? `linear-gradient(145deg, ${PAPER}09, ${PAPER}04 45%, transparent)`
      : "linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,255,255,.62) 52%, rgba(255,255,255,.42))",

    panelBorder: dark ? `${PAPER}18` : "rgba(17,17,17,.14)",
    panelShadow: dark
      ? `inset 0 1px 0 ${PAPER}0B`
      : "inset 0 1px 0 rgba(255,255,255,.9), 0 12px 40px rgba(0,0,0,.035)",

    iconBg: `${ACCENT}${dark ? "14" : "0D"}`,
    iconBorder: `${ACCENT}${dark ? "35" : "45"}`,
    iconColor: ACCENT,

    buttonBg: dark ? `${PAPER}06` : "rgba(255,255,255,.62)",
    buttonBorder: dark ? `${PAPER}20` : "rgba(17,17,17,.13)",
    buttonText: dark ? PAPER : "#3B3730",

    cardBorder: dark ? `${PAPER}16` : "rgba(17,17,17,.12)",
    cardBg: dark ? `${PAPER}05` : "rgba(255,255,255,.55)",
    cardShadow: dark
      ? `inset 0 1px 0 ${PAPER}08`
      : "inset 0 1px 0 rgba(255,255,255,.75)",

    favoriteBorder: dark ? `${PAPER}20` : "rgba(255,255,255,.48)",
    favoriteBg: dark ? `${CHARCOAL}85` : "rgba(15,15,15,.58)",

    yearBorder: dark ? `${PAPER}20` : "rgba(255,255,255,.40)",
    yearBg: dark ? `${CHARCOAL}80` : "rgba(15,15,15,.55)",
    yearText: dark ? PAPER : "rgba(255,255,255,.90)",
  };
}

type Theme = ReturnType<typeof buildTheme>;

export default function AutoShowcase() {
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const dark = !mounted || resolvedTheme === "dark";
  const theme = useMemo(() => buildTheme(dark), [dark]);

  return (
    <motion.section
      className="relative overflow-hidden py-20 px-4 sm:py-24 lg:py-28"
      style={{ backgroundColor: theme.bg, color: theme.text }}
      variants={reducedMotion ? undefined : container}
      initial={reducedMotion ? undefined : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 12% 15%, ${ACCENT}0B, transparent 30%), radial-gradient(circle at 88% 80%, ${dark ? `${PAPER}05` : `${ACCENT}05`}, transparent 28%)`,
        }}
      />

      <div className="container relative mx-auto">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          <CategoryPanel theme={theme} dark={dark} />
          <FeaturedCars theme={theme} dark={dark} />
        </div>
      </div>
    </motion.section>
  );
}

const CategoryPanel = memo(function CategoryPanel({
  theme,
  dark,
}: {
  theme: Theme;
  dark: boolean;
}) {
  return (
    <motion.aside
      variants={item}
      className="relative overflow-hidden rounded-2xl border p-6 sm:p-7"
      style={{
        borderColor: theme.panelBorder,
        background: theme.panel,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: theme.panelShadow,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${dark ? `${PAPER}25` : "rgba(255,255,255,.95)"}, transparent)`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full blur-[80px]"
        style={{ backgroundColor: `${ACCENT}${dark ? "09" : "06"}` }}
      />

      <div className="relative">
        <Eyebrow text="Browse by Category" theme={theme} />

        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-1 lg:gap-y-5">
          {CATEGORIES.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/inventory?category=${encodeURIComponent(name)}`}
                className="group flex items-center gap-3 text-left outline-none"
              >
                <motion.span
                  variants={iconHover}
                  transition={FAST}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: theme.iconBorder,
                    backgroundColor: theme.iconBg,
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: theme.iconColor }}
                  />
                </motion.span>

                <span className="min-w-0">
                  <span
                    className="block text-[13px] font-medium tracking-[-0.01em]"
                    style={{ color: theme.text }}
                  >
                    {name}
                  </span>

                  <span
                    className="mt-1 flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: theme.muted }}
                  >
                    Explore
                    <motion.span
                      variants={arrowHover}
                      transition={FAST}
                      className="flex"
                    >
                      <ArrowRight size={11} strokeWidth={1.6} />
                    </motion.span>
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link href="/inventory">
          <motion.button
            variants={item}
            type="button"
            whileHover={{
              y: -1,
              backgroundColor: dark ? `${PAPER}09` : "rgba(0,0,0,.025)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={FAST}
            className="mt-9 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              borderColor: theme.buttonBorder,
              color: theme.buttonText,
              backgroundColor: theme.buttonBg,
            }}
          >
            View All
            <ArrowRight size={13} strokeWidth={1.5} style={{ color: ACCENT }} />
          </motion.button>
        </Link>
      </div>
    </motion.aside>
  );
});

const FeaturedCars = memo(function FeaturedCars({
  theme,
  dark,
}: {
  theme: Theme;
  dark: boolean;
}) {
  const [cars, setCars] = useState<CarCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getFeaturedVehicles(FEATURED_COUNT).then((vehicles) => {
      if (cancelled) return;
      setCars(vehicles.map(toCardData));
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-w-0">
      <motion.div
        variants={item}
        className="mb-7 flex items-end justify-between gap-5"
      >
        <div>
          <Eyebrow text="Featured Cars" theme={theme} />

          <h2
            className="mt-3 text-xl font-normal tracking-[-0.025em] sm:text-2xl"
            style={{ color: theme.text }}
          >
            Curated for the drive.
          </h2>
        </div>

        <button
          type="button"
          className="group hidden shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:flex"
          style={{ color: theme.soft }}
        >
          View All Cars
          <ArrowRight
            size={13}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {!loading &&
          cars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              theme={theme}
              priority={index === 0}
            />
          ))}
      </motion.div>

      <button
        type="button"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-[10px] font-semibold uppercase tracking-[0.18em] sm:hidden"
        style={{
          borderColor: theme.buttonBorder,
          color: theme.soft,
          backgroundColor: dark ? `${PAPER}03` : "rgba(255,255,255,.42)",
        }}
      >
        View All Cars
        <ArrowRight size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
});

const CarCard = memo(function CarCard({
  car,
  theme,
  priority = false,
}: {
  car: CarCardData;
  theme: Theme;
  priority?: boolean;
}) {
  const [favorited, setFavorited] = useState(false);
  const toggleFavorited = useCallback(
    () => setFavorited((value) => !value),
    [],
  );

  return (
    <Link
      href={`/inventory/${car.slug}`}
      className="block outline-none"
      aria-label={`View ${car.name}`}
    >
      <motion.article
        variants={cardVariants}
        whileHover="hover"
        className="group min-w-0"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
          style={{
            borderColor: theme.cardBorder,
            backgroundColor: theme.cardBg,
            boxShadow: theme.cardShadow,
          }}
        >
          <motion.div
            variants={imageScale}
            transition={IMAGE}
            className="absolute inset-0"
          >
            <Image
              src={car.image}
              alt={car.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
              loading={priority ? undefined : "lazy"}
            />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-16"
            style={{
              background: `linear-gradient(180deg, ${PAPER}0B, transparent)`,
            }}
          />

          <motion.button
            type="button"
            aria-label={
              favorited
                ? `Remove ${car.name} from favorites`
                : `Favorite ${car.name}`
            }
            aria-pressed={favorited}
            onClick={toggleFavorited}
            whileTap={{ scale: 0.88 }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-xl"
            style={{
              borderColor: theme.favoriteBorder,
              backgroundColor: theme.favoriteBg,
              boxShadow: `inset 0 1px 0 ${PAPER}0D`,
            }}
          >
            <motion.span
              variants={heartPop}
              animate={favorited ? "popped" : "idle"}
            >
              <Heart
                size={15}
                strokeWidth={1.55}
                fill={favorited ? ACCENT : "transparent"}
                style={{ color: favorited ? ACCENT : PAPER }}
              />
            </motion.span>
          </motion.button>

          <div
            className="absolute bottom-3 left-3 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur-xl"
            style={{
              borderColor: theme.yearBorder,
              backgroundColor: theme.yearBg,
              color: theme.yearText,
            }}
          >
            {car.year}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="min-w-0 text-[14px] font-medium leading-5 tracking-[-0.01em]"
              style={{ color: theme.text }}
            >
              {car.name}
            </h3>

            <span
              className="shrink-0 text-[13px] font-semibold tabular-nums"
              style={{ color: ACCENT }}
            >
              {car.price}
            </span>
          </div>

          <div
            className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium"
            style={{ color: theme.subtle }}
          >
            <Meta
              icon={<CalendarDays size={12} strokeWidth={1.5} />}
              text={car.year}
            />
            <Meta
              icon={<Gauge size={12} strokeWidth={1.5} />}
              text={car.transmission}
            />
            <Meta icon={<Fuel size={12} strokeWidth={1.5} />} text={car.fuel} />
          </div>
        </div>
      </motion.article>
    </Link>
  );
});

CarCard.displayName = "CarCard";

const Meta = memo(function Meta({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      {icon}
      {text}
    </span>
  );
});

Meta.displayName = "Meta";

function Eyebrow({ text, theme }: { text: string; theme: Theme }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 shrink-0" style={{ backgroundColor: ACCENT }} />
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.24em]"
        style={{ color: theme.muted }}
      >
        {text}
      </span>
    </div>
  );
}
