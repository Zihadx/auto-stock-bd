"use client";

import { memo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
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
import { ACCENT, CHARCOAL, PAPER } from "../ui/tokens";

// next.config.js must whitelist the image host(s) used below, e.g.:
// images: { remotePatterns: [{ hostname: "images.unsplash.com" }] }

const EASE = [0.16, 1, 0.3, 1] as const;

// Hoisted once. Framer Motion re-creates any variants/transition object
// passed inline on every render of that component — for objects handed to
// four category buttons and every car card, that adds up. All shared
// animation config lives at module scope and is reused by reference.
const FAST: Transition = { duration: 0.3, ease: EASE };
const MED: Transition = { duration: 0.4, ease: EASE };
const IMAGE_TRANSITION: Transition = { duration: 0.85, ease: EASE };

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

// Entrance (hidden/show, inherited from the stagger container) and hover
// lift live on one variants object so the card needs a single motion
// element instead of an outer entrance wrapper plus an inner hover wrapper.
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

interface Car {
  name: string;
  price: string;
  year: string;
  transmission: string;
  fuel: string;
  image: string;
}

const CARS: Car[] = [
  {
    name: "BMW M4 Competition",
    price: "$72,500",
    year: "2024",
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Audi R8 Coupe",
    price: "$159,000",
    year: "2024",
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Mercedes-AMG GT",
    price: "$134,900",
    year: "2024",
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90",
  },
];

export default function AutoShowcase() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: CHARCOAL, color: PAPER }}
      variants={reducedMotion ? undefined : container}
      initial={reducedMotion ? undefined : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 12% 15%, ${ACCENT}0B 0, transparent 30%), radial-gradient(circle at 88% 80%, ${PAPER}05 0, transparent 28%)`,
        }}
      />

      <div className="container relative mx-auto">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* ================= CATEGORY GLASS PANEL ================= */}
          <motion.aside
            variants={item}
            className="relative overflow-hidden rounded-2xl border p-6 sm:p-7 lg:p-7"
            style={{
              borderColor: `${PAPER}12`,
              background: `linear-gradient(145deg, ${PAPER}09 0%, ${PAPER}04 45%, transparent 100%)`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: `inset 0 1px 0 ${PAPER}0B`,
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${PAPER}20, transparent)`,
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-7 shrink-0"
                  style={{ backgroundColor: ACCENT }}
                />
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.24em]"
                  style={{ color: `${PAPER}78` }}
                >
                  Browse by Category
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-1 lg:gap-y-5">
                {CATEGORIES.map(({ name, icon: Icon }) => (
                  <motion.button
                    key={name}
                    type="button"
                    variants={item}
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 text-left outline-none"
                  >
                    <motion.span
                      variants={iconHover}
                      transition={FAST}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors"
                      style={{
                        borderColor: `${ACCENT}30`,
                        backgroundColor: `${ACCENT}14`,
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.35}
                        style={{ color: `${ACCENT}CC` }}
                      />
                    </motion.span>

                    <span className="min-w-0">
                      <span className="block text-[13px] font-medium tracking-[-0.01em]">
                        {name}
                      </span>
                      <span
                        className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.12em]"
                        style={{ color: `${PAPER}55` }}
                      >
                        Explore
                        <motion.span
                          variants={arrowHover}
                          transition={FAST}
                          className="flex"
                        >
                          <ArrowRight size={11} strokeWidth={1.5} />
                        </motion.span>
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                variants={item}
                type="button"
                whileHover={{ y: -1, backgroundColor: `${PAPER}08` }}
                whileTap={{ scale: 0.98 }}
                transition={FAST}
                className="mt-9 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{
                  borderColor: `${PAPER}14`,
                  color: `${PAPER}B8`,
                  backgroundColor: `${PAPER}04`,
                }}
              >
                <span>View All</span>
                <ArrowRight
                  size={13}
                  strokeWidth={1.4}
                  style={{ color: ACCENT }}
                />
              </motion.button>
            </div>
          </motion.aside>

          {/* ================= FEATURED CARS ================= */}
          <div className="min-w-0">
            <motion.div
              variants={item}
              className="mb-7 flex items-end justify-between gap-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-7"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.24em]"
                    style={{ color: `${PAPER}78` }}
                  >
                    Featured Cars
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-normal tracking-[-0.025em] sm:text-2xl">
                  Curated for the drive.
                </h2>
              </div>

              <button
                type="button"
                className="group hidden shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] sm:flex"
                style={{ color: `${PAPER}65` }}
              >
                View All Cars
                <ArrowRight
                  size={13}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </motion.div>

            <motion.div
              variants={container}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {CARS.map((car) => (
                <CarCard key={car.name} car={car} />
              ))}
            </motion.div>

            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-[10px] font-medium uppercase tracking-[0.18em] sm:hidden"
              style={{ borderColor: `${PAPER}14`, color: `${PAPER}75` }}
            >
              View All Cars
              <ArrowRight size={13} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ============================================================
   CAR CARD — memoized: CARS is a static module-level array, so
   re-renders of AutoShowcase (e.g. from a future filter/sort state)
   shouldn't force every card to reconcile if its own props didn't change.
============================================================ */

const CarCard = memo(function CarCard({ car }: { car: Car }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      className="min-w-0 group"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${PAPER}10`,
          backgroundColor: `${PAPER}05`,
          boxShadow: `inset 0 1px 0 ${PAPER}08`,
        }}
      >
        <motion.div
          variants={imageScale}
          transition={IMAGE_TRANSITION}
          className="absolute inset-0"
        >
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
        />
        <div
          aria-hidden="true"
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
          onClick={() => setFavorited((v) => !v)}
          whileTap={{ scale: 0.88 }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-xl"
          style={{
            borderColor: `${PAPER}16`,
            backgroundColor: `${CHARCOAL}85`,
            boxShadow: `inset 0 1px 0 ${PAPER}0D`,
          }}
        >
          <motion.span
            variants={heartPop}
            animate={favorited ? "popped" : "idle"}
          >
            <Heart
              size={15}
              strokeWidth={1.45}
              fill={favorited ? ACCENT : "transparent"}
              style={{ color: favorited ? ACCENT : PAPER }}
            />
          </motion.span>
        </motion.button>

        <div
          className="absolute bottom-3 left-3 rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] backdrop-blur-xl"
          style={{
            borderColor: `${PAPER}14`,
            backgroundColor: `${CHARCOAL}80`,
            color: `${PAPER}B5`,
          }}
        >
          {car.year}
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-w-0 text-[14px] font-medium leading-5 tracking-[-0.01em]">
            {car.name}
          </h3>
          <span
            className="shrink-0 text-[13px] font-medium tabular-nums"
            style={{ color: ACCENT }}
          >
            {car.price}
          </span>
        </div>

        <div
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px]"
          style={{ color: `${PAPER}55` }}
        >
          <Meta
            icon={<CalendarDays size={12} strokeWidth={1.4} />}
            text={car.year}
          />
          <Meta
            icon={<Gauge size={12} strokeWidth={1.4} />}
            text={car.transmission}
          />
          <Meta icon={<Fuel size={12} strokeWidth={1.4} />} text={car.fuel} />
        </div>
      </div>
    </motion.article>
  );
});

function Meta({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      {icon}
      {text}
    </span>
  );
}
