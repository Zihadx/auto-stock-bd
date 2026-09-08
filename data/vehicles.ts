import type { Vehicle } from "@/types/vehicle";

/**
 * Vehicle inventory mock data.
 *
 * 51 vehicles across:
 * BMW, Ferrari, Lamborghini, Mercedes-Benz, Porsche,
 * Toyota, Audi, Bugatti, Ford, Honda, Land Rover, Nissan.
 *
 * Vehicle images are hosted by Unsplash.
 */

const UNSPLASH = {
  bmw:
    "https://images.unsplash.com/photo-1740940339304-651f421985b5?auto=format&fit=crop&w=1200&q=85",

  bmw2:
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85",

  ferrari:
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85",

  ferrari2:
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",

  lamborghini:
    "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85",

  lamborghini2:
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",

  mercedes:
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",

  mercedes2:
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85",

  porsche:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",

  porsche2:
    "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1200&q=85",

  toyota:
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85",

  toyota2:
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85",

  audi:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",

  audi2:
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=85",

  bugatti:
    "https://images.unsplash.com/photo-1566023888470-2e5b3c9b4a14?auto=format&fit=crop&w=1200&q=85",

  bugatti2:
    "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=85",

  ford:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",

  ford2:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85",

  honda:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",

  honda2:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85",

  landRover:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85",

  landRover2:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",

  nissan:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85",

  nissan2:
    "https://images.unsplash.com/photo-1511919884226-fd3cd81c0e4d?auto=format&fit=crop&w=1200&q=85",

  genericLuxury:
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=85",
};

function img(
  seed: string,
  url: string,
  alt: string,
  isPrimary = false,
) {
  return {
    id: `${seed}-img`,
    url,
    alt,
    isPrimary,
  };
}

export const vehicles: Vehicle[] = [
  // ============================================================
  // ORIGINAL 15
  // ============================================================

  {
    id: "v-1001",
    slug: "toyota-axio-2019-hybrid",
    brand: "Toyota",
    model: "Axio",
    trim: "X Hybrid",
    year: 2019,
    price: 1_850_000,
    negotiable: true,
    mileageKm: 42_000,
    fuelType: "hybrid",
    transmission: "cvt",
    engineCc: 1500,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Pearl White",
    registrationYear: 2020,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Single-owner Axio Hybrid, garage-kept with full Toyota service history from Dhaka. Fresh registration paper, non-accidental, ready to drive.",
    features: [
      {
        category: "Comfort",
        items: ["Push-button start", "Auto AC", "Power windows"],
      },
      {
        category: "Safety",
        items: ["Dual airbags", "ABS", "Reverse camera"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2019-08-01",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
      {
        id: "h2",
        date: "2024-01-12",
        label: "Service",
        detail: "Hybrid battery health check — passed",
      },
    ],
    images: [
      img(
        "axio-1",
        UNSPLASH.toyota,
        "Toyota Axio front three-quarter",
        true,
      ),
      img(
        "axio-2",
        UNSPLASH.toyota2,
        "Toyota Axio exterior",
      ),
    ],
    ownerCount: 1,
    views: 412,
    inquiryCount: 6,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-08-10T09:00:00.000Z",
  },

  {
    id: "v-1002",
    slug: "honda-vezel-2018-z",
    brand: "Honda",
    model: "Vezel",
    trim: "Z Package",
    year: 2018,
    price: 2_450_000,
    negotiable: true,
    mileageKm: 61_500,
    fuelType: "hybrid",
    transmission: "cvt",
    engineCc: 1500,
    condition: "good",
    bodyType: "SUV",
    color: "Modern Steel Metallic",
    registrationYear: 2019,
    location: "Banani, Dhaka",
    status: "available",
    featured: true,
    description:
      "Popular Vezel Z with panoramic sunroof and paddle shift. Recently imported, tax token and fitness up to date.",
    features: [
      {
        category: "Comfort",
        items: [
          "Panoramic sunroof",
          "Leather seats",
          "Cruise control",
        ],
      },
      {
        category: "Safety",
        items: ["6 airbags", "Vehicle Stability Assist"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2019-03-15",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "vezel-1",
        UNSPLASH.honda,
        "Honda Vezel front",
        true,
      ),
      img(
        "vezel-2",
        UNSPLASH.honda2,
        "Honda Vezel exterior",
      ),
    ],
    ownerCount: 2,
    views: 588,
    inquiryCount: 11,
    createdAt: "2026-06-18T09:00:00.000Z",
    updatedAt: "2026-08-15T09:00:00.000Z",
  },

  {
    id: "v-1003",
    slug: "toyota-premio-2015-f-package",
    brand: "Toyota",
    model: "Premio",
    trim: "F Package",
    year: 2015,
    price: 1_650_000,
    negotiable: false,
    mileageKm: 88_200,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 1500,
    condition: "good",
    bodyType: "Sedan",
    color: "Silver",
    registrationYear: 2016,
    location: "Uttara, Dhaka",
    status: "sold",
    featured: false,
    description:
      "Well-maintained Premio F Package, ideal family sedan with proven reliability.",
    features: [
      {
        category: "Comfort",
        items: ["Auto AC", "Power steering"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2016-02-20",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "premio-1",
        UNSPLASH.toyota,
        "Toyota Premio front",
        true,
      ),
    ],
    ownerCount: 2,
    views: 301,
    inquiryCount: 4,
    createdAt: "2026-04-11T09:00:00.000Z",
    updatedAt: "2026-07-01T09:00:00.000Z",
  },

  {
    id: "v-1004",
    slug: "mitsubishi-outlander-phev-2020",
    brand: "Mitsubishi",
    model: "Outlander",
    trim: "PHEV",
    year: 2020,
    price: 4_950_000,
    negotiable: true,
    mileageKm: 29_800,
    fuelType: "hybrid",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Diamond Black",
    registrationYear: 2021,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Plug-in hybrid Outlander with 7-seat configuration. Extremely low running cost, near-showroom condition.",
    features: [
      {
        category: "Comfort",
        items: ["7 seats", "Heated seats", "Wireless charging"],
      },
      {
        category: "Safety",
        items: [
          "Forward collision mitigation",
          "Blind spot warning",
        ],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-01-10",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "outlander-1",
        UNSPLASH.genericLuxury,
        "Mitsubishi Outlander front",
        true,
      ),
      img(
        "outlander-2",
        UNSPLASH.toyota2,
        "Mitsubishi Outlander exterior",
      ),
    ],
    ownerCount: 1,
    views: 745,
    inquiryCount: 15,
    createdAt: "2026-07-20T09:00:00.000Z",
    updatedAt: "2026-08-18T09:00:00.000Z",
  },

  {
    id: "v-1005",
    slug: "bmw-320i-2017-m-sport",
    brand: "BMW",
    model: "320i",
    trim: "M Sport",
    year: 2017,
    price: 3_800_000,
    negotiable: true,
    mileageKm: 54_000,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Alpine White",
    registrationYear: 2018,
    location: "Gulshan, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "M Sport trim with sport suspension and paddle shifters. Recently serviced at authorized BMW center.",
    features: [
      {
        category: "Comfort",
        items: [
          "M Sport steering",
          "Ambient lighting",
          "Harman Kardon audio",
        ],
      },
      {
        category: "Safety",
        items: [
          "Dynamic stability control",
          "Parking sensors",
        ],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2018-05-22",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "bmw320-1",
        UNSPLASH.bmw,
        "BMW 320i front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 623,
    inquiryCount: 9,
    createdAt: "2026-05-30T09:00:00.000Z",
    updatedAt: "2026-08-05T09:00:00.000Z",
  },

  {
    id: "v-1006",
    slug: "hyundai-tucson-2021",
    brand: "Hyundai",
    model: "Tucson",
    trim: "GLS",
    year: 2021,
    price: 3_250_000,
    negotiable: true,
    mileageKm: 21_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Phantom Black",
    registrationYear: 2022,
    location: "Bashundhara, Dhaka",
    status: "available",
    featured: false,
    description:
      "Low-mileage Tucson GLS, still under manufacturer warranty period equivalent.",
    features: [
      {
        category: "Comfort",
        items: ["Panoramic sunroof", "Ventilated seats"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-02-14",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "tucson-1",
        UNSPLASH.genericLuxury,
        "Hyundai Tucson front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 289,
    inquiryCount: 5,
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedAt: "2026-08-19T09:00:00.000Z",
  },

  {
    id: "v-1007",
    slug: "suzuki-swift-2019",
    brand: "Suzuki",
    model: "Swift",
    trim: "RS",
    year: 2019,
    price: 1_450_000,
    negotiable: true,
    mileageKm: 35_600,
    fuelType: "petrol",
    transmission: "cvt",
    engineCc: 1200,
    condition: "good",
    bodyType: "Hatchback",
    color: "Fire Red",
    registrationYear: 2020,
    location: "Mirpur, Dhaka",
    status: "available",
    featured: false,
    description:
      "Fuel-efficient city hatchback, perfect first car. Recently replaced tyres and battery.",
    features: [
      {
        category: "Comfort",
        items: [
          "Keyless entry",
          "Touchscreen infotainment",
        ],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-03-01",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "swift-1",
        UNSPLASH.toyota2,
        "Suzuki Swift front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 198,
    inquiryCount: 3,
    createdAt: "2026-07-28T09:00:00.000Z",
    updatedAt: "2026-08-12T09:00:00.000Z",
  },

  {
    id: "v-1008",
    slug: "mercedes-benz-c200-2016",
    brand: "Mercedes-Benz",
    model: "C200",
    trim: "AMG Line",
    year: 2016,
    price: 4_450_000,
    negotiable: true,
    mileageKm: 67_000,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "good",
    bodyType: "Sedan",
    color: "Obsidian Black",
    registrationYear: 2017,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "AMG Line C200 with distinctive body kit and 18-inch AMG wheels. Well documented service records.",
    features: [
      {
        category: "Comfort",
        items: [
          "Burmester audio",
          "Memory seats",
          "COMAND infotainment",
        ],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2017-06-19",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "c200-1",
        UNSPLASH.mercedes,
        "Mercedes-Benz C200 front",
        true,
      ),
      img(
        "c200-2",
        UNSPLASH.mercedes2,
        "Mercedes-Benz C200 exterior",
      ),
    ],
    ownerCount: 2,
    views: 534,
    inquiryCount: 8,
    createdAt: "2026-06-05T09:00:00.000Z",
    updatedAt: "2026-08-02T09:00:00.000Z",
  },

  {
    id: "v-1009",
    slug: "kia-sportage-2020",
    brand: "Kia",
    model: "Sportage",
    trim: "AWD",
    year: 2020,
    price: 3_050_000,
    negotiable: true,
    mileageKm: 38_900,
    fuelType: "diesel",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Snow White Pearl",
    registrationYear: 2021,
    location: "Dhanmondi, Dhaka",
    status: "available",
    featured: false,
    description:
      "AWD Sportage, great for highway trips, recently serviced with new brake pads all around.",
    features: [
      {
        category: "Comfort",
        items: [
          "AWD mode select",
          "Heated steering wheel",
        ],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-04-08",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "sportage-1",
        UNSPLASH.genericLuxury,
        "Kia Sportage front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 267,
    inquiryCount: 4,
    createdAt: "2026-07-15T09:00:00.000Z",
    updatedAt: "2026-08-09T09:00:00.000Z",
  },

  {
    id: "v-1010",
    slug: "nissan-x-trail-2017",
    brand: "Nissan",
    model: "X-Trail",
    trim: "20X",
    year: 2017,
    price: 2_650_000,
    negotiable: true,
    mileageKm: 71_200,
    fuelType: "petrol",
    transmission: "cvt",
    engineCc: 2000,
    condition: "good",
    bodyType: "SUV",
    color: "Brilliant Silver",
    registrationYear: 2018,
    location: "Mohammadpur, Dhaka",
    status: "available",
    featured: false,
    description:
      "Spacious 5-seat X-Trail with reliable CVT gearbox, ideal for growing families.",
    features: [
      {
        category: "Comfort",
        items: ["Around view monitor", "Auto AC"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2018-07-02",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "xtrail-1",
        UNSPLASH.nissan,
        "Nissan X-Trail front",
        true,
      ),
    ],
    ownerCount: 2,
    views: 213,
    inquiryCount: 2,
    createdAt: "2026-06-25T09:00:00.000Z",
    updatedAt: "2026-07-30T09:00:00.000Z",
  },

  {
    id: "v-1011",
    slug: "toyota-corolla-axio-2021",
    brand: "Toyota",
    model: "Corolla Axio",
    trim: "X",
    year: 2021,
    price: 2_150_000,
    negotiable: false,
    mileageKm: 15_300,
    fuelType: "petrol",
    transmission: "cvt",
    engineCc: 1500,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Attitude Black",
    registrationYear: 2022,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Near-new Corolla Axio with very low mileage. Still smells new, first owner.",
    features: [
      {
        category: "Safety",
        items: ["Toyota Safety Sense", "7 airbags"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-01-19",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "axio2-1",
        UNSPLASH.toyota2,
        "Toyota Corolla Axio front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 601,
    inquiryCount: 13,
    createdAt: "2026-08-05T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "v-1012",
    slug: "mazda-cx-5-2019",
    brand: "Mazda",
    model: "CX-5",
    trim: "Touring",
    year: 2019,
    price: 3_150_000,
    negotiable: true,
    mileageKm: 44_700,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Soul Red Crystal",
    registrationYear: 2020,
    location: "Banani, Dhaka",
    status: "reserved",
    featured: false,
    description:
      "Striking Soul Red CX-5 Touring with premium Bose sound system and full leather interior.",
    features: [
      {
        category: "Comfort",
        items: [
          "Bose 10-speaker audio",
          "Leather seats",
        ],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-05-11",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "cx5-1",
        UNSPLASH.genericLuxury,
        "Mazda CX-5 front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 356,
    inquiryCount: 6,
    createdAt: "2026-07-10T09:00:00.000Z",
    updatedAt: "2026-08-14T09:00:00.000Z",
  },

  {
    id: "v-1013",
    slug: "audi-a4-2016",
    brand: "Audi",
    model: "A4",
    trim: "1.8 TFSI",
    year: 2016,
    price: 3_650_000,
    negotiable: true,
    mileageKm: 59_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 1800,
    condition: "good",
    bodyType: "Sedan",
    color: "Glacier White",
    registrationYear: 2017,
    location: "Gulshan, Dhaka",
    status: "sold",
    featured: false,
    description:
      "Quattro-badged A4 with Virtual Cockpit digital instrument cluster.",
    features: [
      {
        category: "Comfort",
        items: ["Virtual Cockpit", "MMI Navigation"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2017-09-09",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "a4-1",
        UNSPLASH.audi,
        "Audi A4 front",
        true,
      ),
    ],
    ownerCount: 2,
    views: 178,
    inquiryCount: 2,
    createdAt: "2026-03-22T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z",
  },

  {
    id: "v-1014",
    slug: "honda-cr-v-2018",
    brand: "Honda",
    model: "CR-V",
    trim: "EX",
    year: 2018,
    price: 3_450_000,
    negotiable: true,
    mileageKm: 48_100,
    fuelType: "petrol",
    transmission: "cvt",
    engineCc: 1500,
    condition: "excellent",
    bodyType: "SUV",
    color: "Modern Steel Metallic",
    registrationYear: 2019,
    location: "Uttara, Dhaka",
    status: "available",
    featured: false,
    description:
      "Turbocharged 1.5L CR-V EX, 7-seat option, well-maintained with full service book.",
    features: [
      {
        category: "Comfort",
        items: ["Power tailgate", "Dual-zone climate"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2019-02-27",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "crv-1",
        UNSPLASH.honda,
        "Honda CR-V front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 402,
    inquiryCount: 7,
    createdAt: "2026-07-08T09:00:00.000Z",
    updatedAt: "2026-08-11T09:00:00.000Z",
  },

  {
    id: "v-1015",
    slug: "toyota-hilux-2020",
    brand: "Toyota",
    model: "Hilux",
    trim: "Vigo Champ",
    year: 2020,
    price: 3_950_000,
    negotiable: true,
    mileageKm: 52_300,
    fuelType: "diesel",
    transmission: "manual",
    engineCc: 2500,
    condition: "good",
    bodyType: "Pickup",
    color: "Silver",
    registrationYear: 2020,
    location: "Savar, Dhaka",
    status: "available",
    featured: false,
    description:
      "Rugged double-cab Hilux, well suited for commercial or highway use, recently serviced.",
    features: [
      {
        category: "Utility",
        items: ["4x4 mode", "Load bed liner"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-08-14",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img(
        "hilux-1",
        UNSPLASH.toyota,
        "Toyota Hilux front",
        true,
      ),
    ],
    ownerCount: 1,
    views: 231,
    inquiryCount: 5,
    createdAt: "2026-06-30T09:00:00.000Z",
    updatedAt: "2026-08-03T09:00:00.000Z",
  },

  // ============================================================
  // BMW — 3 NEW
  // ============================================================

  {
    id: "v-1016",
    slug: "bmw-m4-2021-competition",
    brand: "BMW",
    model: "M4",
    trim: "Competition",
    year: 2021,
    price: 3_200_000,
    negotiable: true,
    mileageKm: 28_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Brooklyn Grey",
    registrationYear: 2022,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "High-performance BMW M4 Competition with aggressive M styling and low mileage.",
    features: [
      {
        category: "Performance",
        items: ["M Sport differential", "Adaptive M suspension", "Launch control"],
      },
      {
        category: "Comfort",
        items: ["Merino leather", "Harman Kardon audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-04-10",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("m4-1", UNSPLASH.bmw, "BMW M4 Competition", true),
      img("m4-2", UNSPLASH.bmw2, "BMW M4 exterior"),
    ],
    ownerCount: 1,
    views: 842,
    inquiryCount: 19,
    createdAt: "2026-07-22T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z",
  },

  {
    id: "v-1017",
    slug: "bmw-740li-2019",
    brand: "BMW",
    model: "740Li",
    trim: "Luxury Line",
    year: 2019,
    price: 7_200_000,
    negotiable: true,
    mileageKm: 31_600,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Mineral White",
    registrationYear: 2020,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Long-wheelbase BMW 7 Series with executive rear cabin and premium comfort equipment.",
    features: [
      {
        category: "Luxury",
        items: ["Executive rear seats", "Panoramic Sky Lounge", "Nappa leather"],
      },
      {
        category: "Technology",
        items: ["Gesture control", "Head-up display"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-01-14",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("740li-1", UNSPLASH.bmw2, "BMW 740Li", true),
    ],
    ownerCount: 1,
    views: 512,
    inquiryCount: 8,
    createdAt: "2026-06-11T09:00:00.000Z",
    updatedAt: "2026-08-16T09:00:00.000Z",
  },

  {
    id: "v-1018",
    slug: "bmw-x5-2020-xdrive40i",
    brand: "BMW",
    model: "X5",
    trim: "xDrive40i",
    year: 2020,
    price: 6_500_000,
    negotiable: true,
    mileageKm: 35_200,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Carbon Black",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Premium BMW X5 xDrive40i with intelligent all-wheel drive and spacious luxury cabin.",
    features: [
      {
        category: "Comfort",
        items: ["Panoramic roof", "Comfort seats", "Ambient lighting"],
      },
      {
        category: "Safety",
        items: ["360° camera", "Lane departure warning"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-02-18",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("x5-1", UNSPLASH.bmw, "BMW X5", true),
    ],
    ownerCount: 1,
    views: 677,
    inquiryCount: 12,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-08-19T09:00:00.000Z",
  },

  // ============================================================
  // FERRARI — 3
  // ============================================================

  {
    id: "v-1019",
    slug: "ferrari-488-gtb-2018",
    brand: "Ferrari",
    model: "488 GTB",
    trim: "GTB",
    year: 2018,
    price: 85_000_000,
    negotiable: true,
    mileageKm: 9_800,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3900,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Rosso Corsa",
    registrationYear: 2019,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Low-mileage Ferrari 488 GTB finished in classic Rosso Corsa with full service documentation.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V8", "Carbon ceramic brakes", "Manettino"],
      },
      {
        category: "Luxury",
        items: ["Carbon fiber interior", "Daytona seats"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2019-06-15",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("f488-1", UNSPLASH.ferrari, "Ferrari 488 GTB", true),
      img("f488-2", UNSPLASH.ferrari2, "Ferrari sports car exterior"),
    ],
    ownerCount: 1,
    views: 1324,
    inquiryCount: 28,
    createdAt: "2026-05-20T09:00:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
  },

  {
    id: "v-1020",
    slug: "ferrari-portofino-2020",
    brand: "Ferrari",
    model: "Portofino",
    trim: "Convertible",
    year: 2020,
    price: 95_000_000,
    negotiable: true,
    mileageKm: 7_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3900,
    condition: "excellent",
    bodyType: "Convertible",
    color: "Bianco Avus",
    registrationYear: 2021,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Elegant Ferrari Portofino convertible with retractable hardtop and grand-touring character.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V8", "F1 dual-clutch transmission"],
      },
      {
        category: "Comfort",
        items: ["Ventilated seats", "Premium audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-03-09",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("portofino-1", UNSPLASH.ferrari2, "Ferrari Portofino", true),
    ],
    ownerCount: 1,
    views: 978,
    inquiryCount: 21,
    createdAt: "2026-06-13T09:00:00.000Z",
    updatedAt: "2026-08-17T09:00:00.000Z",
  },

  {
    id: "v-1021",
    slug: "ferrari-f8-tributo-2021",
    brand: "Ferrari",
    model: "F8 Tributo",
    trim: "Tributo",
    year: 2021,
    price: 120_000_000,
    negotiable: true,
    mileageKm: 4_900,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3900,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Rosso Scuderia",
    registrationYear: 2022,
    location: "Gulshan, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Collector-grade Ferrari F8 Tributo with extremely low mileage and exceptional presentation.",
    features: [
      {
        category: "Performance",
        items: ["710 hp V8", "Carbon fiber wheels", "Racing Manettino"],
      },
      {
        category: "Technology",
        items: ["Side Slip Control", "F1-Trac"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-02-11",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("f8-1", UNSPLASH.ferrari, "Ferrari F8 Tributo", true),
    ],
    ownerCount: 1,
    views: 1643,
    inquiryCount: 34,
    createdAt: "2026-07-30T09:00:00.000Z",
    updatedAt: "2026-08-23T09:00:00.000Z",
  },

  // ============================================================
  // LAMBORGHINI — 3
  // ============================================================

  {
    id: "v-1022",
    slug: "lamborghini-huracan-evo-2020",
    brand: "Lamborghini",
    model: "Huracán",
    trim: "EVO",
    year: 2020,
    price: 110_000_000,
    negotiable: true,
    mileageKm: 8_200,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 5200,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Verde Mantis",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Lamborghini Huracán EVO with naturally aspirated V10 performance and dramatic Italian styling.",
    features: [
      {
        category: "Performance",
        items: ["Naturally aspirated V10", "All-wheel drive", "LDVI"],
      },
      {
        category: "Technology",
        items: ["ANIMA drive modes", "Launch control"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-05-05",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("huracan-1", UNSPLASH.lamborghini, "Lamborghini Huracán EVO", true),
      img("huracan-2", UNSPLASH.lamborghini2, "Lamborghini Huracán"),
    ],
    ownerCount: 1,
    views: 1876,
    inquiryCount: 42,
    createdAt: "2026-06-02T09:00:00.000Z",
    updatedAt: "2026-08-24T09:00:00.000Z",
  },

  {
    id: "v-1023",
    slug: "lamborghini-urus-2021",
    brand: "Lamborghini",
    model: "Urus",
    trim: "V8",
    year: 2021,
    price: 135_000_000,
    negotiable: true,
    mileageKm: 12_700,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 4000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Nero Noctis",
    registrationYear: 2022,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Performance SUV combining Lamborghini design with everyday usability and four-wheel drive.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V8", "Adaptive air suspension"],
      },
      {
        category: "Luxury",
        items: ["Alcantara interior", "Panoramic roof"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-02-20",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("urus-1", UNSPLASH.lamborghini2, "Lamborghini Urus", true),
    ],
    ownerCount: 1,
    views: 1457,
    inquiryCount: 31,
    createdAt: "2026-07-06T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z",
  },

  {
    id: "v-1024",
    slug: "lamborghini-aventador-s-2019",
    brand: "Lamborghini",
    model: "Aventador S",
    trim: "S",
    year: 2019,
    price: 150_000_000,
    negotiable: true,
    mileageKm: 6_100,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 6500,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Arancio Atlas",
    registrationYear: 2020,
    location: "Gulshan, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Rare Lamborghini Aventador S powered by a naturally aspirated V12.",
    features: [
      {
        category: "Performance",
        items: ["6.5L V12", "Rear-wheel steering", "Carbon ceramic brakes"],
      },
      {
        category: "Technology",
        items: ["Drive select", "Launch control"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-07-08",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("aventador-1", UNSPLASH.lamborghini, "Lamborghini Aventador S", true),
    ],
    ownerCount: 1,
    views: 2103,
    inquiryCount: 47,
    createdAt: "2026-05-28T09:00:00.000Z",
    updatedAt: "2026-08-25T09:00:00.000Z",
  },

  // ============================================================
  // MERCEDES-BENZ — 3
  // ============================================================

  {
    id: "v-1025",
    slug: "mercedes-benz-s450-2020",
    brand: "Mercedes-Benz",
    model: "S450",
    trim: "AMG Line",
    year: 2020,
    price: 7_800_000,
    negotiable: true,
    mileageKm: 24_500,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Obsidian Black",
    registrationYear: 2021,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Executive Mercedes-Benz S-Class with long-wheelbase comfort and advanced driver assistance.",
    features: [
      {
        category: "Luxury",
        items: ["Nappa leather", "Burmester 3D audio", "Rear executive seats"],
      },
      {
        category: "Technology",
        items: ["MBUX", "360° camera"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-04-12",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("s450-1", UNSPLASH.mercedes, "Mercedes-Benz S450", true),
      img("s450-2", UNSPLASH.mercedes2, "Mercedes-Benz S-Class"),
    ],
    ownerCount: 1,
    views: 1124,
    inquiryCount: 25,
    createdAt: "2026-06-17T09:00:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
  },

  {
    id: "v-1026",
    slug: "mercedes-amg-gt-2019",
    brand: "Mercedes-Benz",
    model: "AMG GT",
    trim: "AMG GT",
    year: 2019,
    price: 6_200_000,
    negotiable: true,
    mileageKm: 19_800,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 4000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Designo Hyacinth Red",
    registrationYear: 2020,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Two-seat AMG GT with handcrafted performance character and twin-turbo V8 power.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V8", "AMG Ride Control", "Performance exhaust"],
      },
      {
        category: "Comfort",
        items: ["AMG sports seats", "Burmester audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-03-10",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("amggt-1", UNSPLASH.mercedes2, "Mercedes-AMG GT", true),
    ],
    ownerCount: 1,
    views: 1288,
    inquiryCount: 29,
    createdAt: "2026-07-04T09:00:00.000Z",
    updatedAt: "2026-08-18T09:00:00.000Z",
  },

  {
    id: "v-1027",
    slug: "mercedes-benz-gls-2021",
    brand: "Mercedes-Benz",
    model: "GLS",
    trim: "450 4MATIC",
    year: 2021,
    price: 12_500_000,
    negotiable: true,
    mileageKm: 17_200,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Polar White",
    registrationYear: 2022,
    location: "Banani, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Full-size Mercedes-Benz GLS with seven seats and premium family-oriented luxury.",
    features: [
      {
        category: "Comfort",
        items: ["7 seats", "Panoramic roof", "Heated and ventilated seats"],
      },
      {
        category: "Technology",
        items: ["MBUX", "Burmester surround sound"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-05-21",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("gls-1", UNSPLASH.mercedes, "Mercedes-Benz GLS", true),
    ],
    ownerCount: 1,
    views: 1057,
    inquiryCount: 23,
    createdAt: "2026-07-14T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  // ============================================================
  // PORSCHE — 3
  // ============================================================

  {
    id: "v-1028",
    slug: "porsche-911-carrera-2020",
    brand: "Porsche",
    model: "911",
    trim: "Carrera",
    year: 2020,
    price: 18_000_000,
    negotiable: true,
    mileageKm: 14_800,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Guards Red",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Iconic Porsche 911 Carrera with rear-engine balance and premium sports-car specification.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo flat-six", "Sport Chrono", "PASM"],
      },
      {
        category: "Technology",
        items: ["Porsche Communication Management", "Rear camera"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-04-15",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("911-1", UNSPLASH.porsche, "Porsche 911 Carrera", true),
      img("911-2", UNSPLASH.porsche2, "Porsche 911 exterior"),
    ],
    ownerCount: 1,
    views: 1542,
    inquiryCount: 33,
    createdAt: "2026-06-09T09:00:00.000Z",
    updatedAt: "2026-08-23T09:00:00.000Z",
  },

  {
    id: "v-1029",
    slug: "porsche-cayenne-2021",
    brand: "Porsche",
    model: "Cayenne",
    trim: "S",
    year: 2021,
    price: 22_000_000,
    negotiable: true,
    mileageKm: 20_600,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2900,
    condition: "excellent",
    bodyType: "SUV",
    color: "Jet Black Metallic",
    registrationYear: 2022,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Sporting Porsche Cayenne S with strong performance and premium SUV practicality.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V6", "Porsche Traction Management"],
      },
      {
        category: "Luxury",
        items: ["Panoramic roof", "Bose audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-03-17",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("cayenne-1", UNSPLASH.porsche2, "Porsche Cayenne S", true),
    ],
    ownerCount: 1,
    views: 1198,
    inquiryCount: 27,
    createdAt: "2026-07-03T09:00:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
  },

  {
    id: "v-1030",
    slug: "porsche-panamera-2019",
    brand: "Porsche",
    model: "Panamera",
    trim: "4S",
    year: 2019,
    price: 35_000_000,
    negotiable: true,
    mileageKm: 23_100,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2900,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Carrara White",
    registrationYear: 2020,
    location: "Gulshan, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Porsche Panamera 4S combining executive luxury with genuine sports-car performance.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V6", "Active suspension"],
      },
      {
        category: "Luxury",
        items: ["Panoramic roof", "Bose surround sound"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-06-18",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("panamera-1", UNSPLASH.porsche, "Porsche Panamera 4S", true),
    ],
    ownerCount: 1,
    views: 976,
    inquiryCount: 18,
    createdAt: "2026-05-19T09:00:00.000Z",
    updatedAt: "2026-08-16T09:00:00.000Z",
  },

  // ============================================================
  // TOYOTA — 3 NEW
  // ============================================================

  {
    id: "v-1031",
    slug: "toyota-land-cruiser-prado-2021",
    brand: "Toyota",
    model: "Land Cruiser Prado",
    trim: "TX-L",
    year: 2021,
    price: 5_200_000,
    negotiable: true,
    mileageKm: 38_600,
    fuelType: "diesel",
    transmission: "automatic",
    engineCc: 2800,
    condition: "excellent",
    bodyType: "SUV",
    color: "White Pearl",
    registrationYear: 2022,
    location: "Banani, Dhaka",
    status: "available",
    featured: true,
    description:
      "Reliable Land Cruiser Prado with strong off-road capability and premium family comfort.",
    features: [
      {
        category: "Utility",
        items: ["4WD", "Multi-terrain select", "Hill descent control"],
      },
      {
        category: "Comfort",
        items: ["Leather seats", "Sunroof"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-04-02",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("prado-1", UNSPLASH.toyota, "Toyota Land Cruiser Prado", true),
      img("prado-2", UNSPLASH.toyota2, "Toyota Prado exterior"),
    ],
    ownerCount: 1,
    views: 814,
    inquiryCount: 17,
    createdAt: "2026-07-05T09:00:00.000Z",
    updatedAt: "2026-08-19T09:00:00.000Z",
  },

  {
    id: "v-1032",
    slug: "toyota-supra-2021",
    brand: "Toyota",
    model: "GR Supra",
    trim: "3.0 Premium",
    year: 2021,
    price: 6_800_000,
    negotiable: true,
    mileageKm: 18_900,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Renaissance Red",
    registrationYear: 2022,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Toyota GR Supra 3.0 with rear-wheel drive and legendary performance-focused design.",
    features: [
      {
        category: "Performance",
        items: ["Turbocharged inline-six", "Active differential"],
      },
      {
        category: "Technology",
        items: ["Adaptive cruise control", "Premium JBL audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-05-11",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("supra-1", UNSPLASH.toyota2, "Toyota GR Supra", true),
    ],
    ownerCount: 1,
    views: 1089,
    inquiryCount: 26,
    createdAt: "2026-06-27T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z",
  },

  {
    id: "v-1033",
    slug: "toyota-fortuner-2020",
    brand: "Toyota",
    model: "Fortuner",
    trim: "Legender",
    year: 2020,
    price: 9_500_000,
    negotiable: true,
    mileageKm: 42_700,
    fuelType: "diesel",
    transmission: "automatic",
    engineCc: 2800,
    condition: "excellent",
    bodyType: "SUV",
    color: "Attitude Black",
    registrationYear: 2021,
    location: "Uttara, Dhaka",
    status: "available",
    featured: false,
    description:
      "Premium Fortuner Legender with seven-seat practicality and dependable diesel performance.",
    features: [
      {
        category: "Utility",
        items: ["4WD", "7 seats", "Downhill assist"],
      },
      {
        category: "Comfort",
        items: ["Leather interior", "Power tailgate"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-06-14",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("fortuner-1", UNSPLASH.toyota, "Toyota Fortuner Legender", true),
    ],
    ownerCount: 1,
    views: 721,
    inquiryCount: 15,
    createdAt: "2026-07-09T09:00:00.000Z",
    updatedAt: "2026-08-18T09:00:00.000Z",
  },

  // ============================================================
  // AUDI — 3
  // ============================================================

  {
    id: "v-1034",
    slug: "audi-r8-v10-2020",
    brand: "Audi",
    model: "R8",
    trim: "V10 Performance",
    year: 2020,
    price: 7_200_000,
    negotiable: true,
    mileageKm: 11_200,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 5200,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Daytona Grey",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Audi R8 V10 Performance with naturally aspirated V10 power and quattro traction.",
    features: [
      {
        category: "Performance",
        items: ["5.2L V10", "Quattro AWD", "Carbon ceramic brakes"],
      },
      {
        category: "Technology",
        items: ["Virtual Cockpit", "Bang & Olufsen audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-03-14",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("r8-1", UNSPLASH.audi, "Audi R8 V10", true),
      img("r8-2", UNSPLASH.audi2, "Audi R8 exterior"),
    ],
    ownerCount: 1,
    views: 1466,
    inquiryCount: 35,
    createdAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-08-23T09:00:00.000Z",
  },

  {
    id: "v-1035",
    slug: "audi-a6-2021",
    brand: "Audi",
    model: "A6",
    trim: "45 TFSI",
    year: 2021,
    price: 5_200_000,
    negotiable: true,
    mileageKm: 24_600,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Glacier White",
    registrationYear: 2022,
    location: "Banani, Dhaka",
    status: "available",
    featured: true,
    description:
      "Elegant Audi A6 executive sedan with refined technology and premium cabin materials.",
    features: [
      {
        category: "Comfort",
        items: ["Valcona leather", "Four-zone climate control"],
      },
      {
        category: "Technology",
        items: ["MMI Navigation", "Virtual Cockpit"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-02-06",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("a6-1", UNSPLASH.audi2, "Audi A6", true),
    ],
    ownerCount: 1,
    views: 782,
    inquiryCount: 14,
    createdAt: "2026-07-13T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "v-1036",
    slug: "audi-q7-2020",
    brand: "Audi",
    model: "Q7",
    trim: "45 TFSI",
    year: 2020,
    price: 8_800_000,
    negotiable: true,
    mileageKm: 28_500,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Mythos Black",
    registrationYear: 2021,
    location: "Baridhara, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Three-row Audi Q7 with quattro all-wheel drive and sophisticated family luxury.",
    features: [
      {
        category: "Comfort",
        items: ["7 seats", "Panoramic sunroof", "Premium leather"],
      },
      {
        category: "Safety",
        items: ["360° camera", "Lane assist"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-04-23",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("q7-1", UNSPLASH.audi, "Audi Q7", true),
    ],
    ownerCount: 1,
    views: 934,
    inquiryCount: 18,
    createdAt: "2026-06-21T09:00:00.000Z",
    updatedAt: "2026-08-19T09:00:00.000Z",
  },

  // ============================================================
  // BUGATTI — 3
  // ============================================================

  {
    id: "v-1037",
    slug: "bugatti-chiron-2019",
    brand: "Bugatti",
    model: "Chiron",
    trim: "Sport",
    year: 2019,
    price: 180_000_000,
    negotiable: true,
    mileageKm: 1_900,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 8000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "French Racing Blue",
    registrationYear: 2020,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Ultra-low-mileage Bugatti Chiron with quad-turbo W16 power and exceptional collector appeal.",
    features: [
      {
        category: "Performance",
        items: ["8.0L W16", "Quad turbochargers", "Carbon ceramic brakes"],
      },
      {
        category: "Luxury",
        items: ["Full leather cabin", "Carbon fiber interior"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2020-06-01",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("chiron-1", UNSPLASH.bugatti, "Bugatti Chiron", true),
      img("chiron-2", UNSPLASH.bugatti2, "Bugatti hypercar exterior"),
    ],
    ownerCount: 1,
    views: 3254,
    inquiryCount: 61,
    createdAt: "2026-04-15T09:00:00.000Z",
    updatedAt: "2026-08-25T09:00:00.000Z",
  },

  {
    id: "v-1038",
    slug: "bugatti-veyron-2015",
    brand: "Bugatti",
    model: "Veyron",
    trim: "16.4",
    year: 2015,
    price: 220_000_000,
    negotiable: true,
    mileageKm: 3_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 8000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Black / Blue",
    registrationYear: 2016,
    location: "Baridhara, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Rare Bugatti Veyron 16.4 presented as a collector-grade hypercar.",
    features: [
      {
        category: "Performance",
        items: ["W16 engine", "Quad turbo", "All-wheel drive"],
      },
      {
        category: "Luxury",
        items: ["Hand-finished cabin", "Carbon fiber trim"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2016-08-09",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("veyron-1", UNSPLASH.bugatti2, "Bugatti Veyron", true),
    ],
    ownerCount: 1,
    views: 2811,
    inquiryCount: 52,
    createdAt: "2026-05-05T09:00:00.000Z",
    updatedAt: "2026-08-24T09:00:00.000Z",
  },

  {
    id: "v-1039",
    slug: "bugatti-chiron-pur-sport-2021",
    brand: "Bugatti",
    model: "Chiron",
    trim: "Pur Sport",
    year: 2021,
    price: 250_000_000,
    negotiable: true,
    mileageKm: 900,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 8000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Nocturne Black",
    registrationYear: 2022,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Extremely rare Chiron Pur Sport with track-focused engineering and ultra-low mileage.",
    features: [
      {
        category: "Performance",
        items: ["W16 quad-turbo", "Magnesium wheels", "Titanium exhaust"],
      },
      {
        category: "Technology",
        items: ["Revised aero", "Track-focused chassis"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-04-18",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("pur-sport-1", UNSPLASH.bugatti, "Bugatti Chiron Pur Sport", true),
    ],
    ownerCount: 1,
    views: 3892,
    inquiryCount: 74,
    createdAt: "2026-07-25T09:00:00.000Z",
    updatedAt: "2026-08-26T09:00:00.000Z",
  },

  // ============================================================
  // FORD — 3
  // ============================================================

  {
    id: "v-1040",
    slug: "ford-mustang-gt-2020",
    brand: "Ford",
    model: "Mustang",
    trim: "GT Premium",
    year: 2020,
    price: 6_500_000,
    negotiable: true,
    mileageKm: 21_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 5000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Shadow Black",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Ford Mustang GT with naturally aspirated V8 and classic American muscle character.",
    features: [
      {
        category: "Performance",
        items: ["5.0L V8", "Launch control", "Sport exhaust"],
      },
      {
        category: "Comfort",
        items: ["Leather seats", "SYNC infotainment"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-05-02",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("mustang-1", UNSPLASH.ford, "Ford Mustang GT", true),
      img("mustang-2", UNSPLASH.ford2, "Ford Mustang exterior"),
    ],
    ownerCount: 1,
    views: 1112,
    inquiryCount: 24,
    createdAt: "2026-06-28T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z",
  },

  {
    id: "v-1041",
    slug: "ford-ranger-raptor-2021",
    brand: "Ford",
    model: "Ranger",
    trim: "Raptor",
    year: 2021,
    price: 4_800_000,
    negotiable: true,
    mileageKm: 34_600,
    fuelType: "diesel",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "Pickup",
    color: "Performance Blue",
    registrationYear: 2022,
    location: "Savar, Dhaka",
    status: "available",
    featured: true,
    description:
      "Ford Ranger Raptor built for off-road performance with reinforced suspension and aggressive styling.",
    features: [
      {
        category: "Utility",
        items: ["4x4", "FOX suspension", "Terrain management"],
      },
      {
        category: "Comfort",
        items: ["Sports seats", "SYNC infotainment"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-02-08",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("raptor-1", UNSPLASH.ford2, "Ford Ranger Raptor", true),
    ],
    ownerCount: 1,
    views: 927,
    inquiryCount: 21,
    createdAt: "2026-07-11T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "v-1042",
    slug: "ford-explorer-2020",
    brand: "Ford",
    model: "Explorer",
    trim: "Limited",
    year: 2020,
    price: 8_500_000,
    negotiable: true,
    mileageKm: 29_300,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2300,
    condition: "excellent",
    bodyType: "SUV",
    color: "Agate Black",
    registrationYear: 2021,
    location: "Banani, Dhaka",
    status: "reserved",
    featured: false,
    description:
      "Seven-seat Ford Explorer Limited with premium cabin and capable all-wheel drive.",
    features: [
      {
        category: "Comfort",
        items: ["7 seats", "Leather seats", "Panoramic roof"],
      },
      {
        category: "Safety",
        items: ["360° camera", "Adaptive cruise control"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-03-16",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("explorer-1", UNSPLASH.ford, "Ford Explorer", true),
    ],
    ownerCount: 1,
    views: 654,
    inquiryCount: 13,
    createdAt: "2026-06-23T09:00:00.000Z",
    updatedAt: "2026-08-15T09:00:00.000Z",
  },

  // ============================================================
  // HONDA — 3
  // ============================================================

  {
    id: "v-1043",
    slug: "honda-civic-turbo-2021",
    brand: "Honda",
    model: "Civic",
    trim: "Turbo",
    year: 2021,
    price: 2_800_000,
    negotiable: true,
    mileageKm: 22_100,
    fuelType: "petrol",
    transmission: "cvt",
    engineCc: 1500,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Platinum White",
    registrationYear: 2022,
    location: "Dhanmondi, Dhaka",
    status: "available",
    featured: true,
    description:
      "Turbocharged Honda Civic with modern styling, excellent efficiency and low mileage.",
    features: [
      {
        category: "Comfort",
        items: ["Push-button start", "Dual-zone AC"],
      },
      {
        category: "Safety",
        items: ["Honda Sensing", "Lane keep assist"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-04-11",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("civic-1", UNSPLASH.honda, "Honda Civic Turbo", true),
      img("civic-2", UNSPLASH.honda2, "Honda Civic exterior"),
    ],
    ownerCount: 1,
    views: 634,
    inquiryCount: 15,
    createdAt: "2026-07-12T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "v-1044",
    slug: "honda-accord-2020",
    brand: "Honda",
    model: "Accord",
    trim: "2.0 Turbo",
    year: 2020,
    price: 4_200_000,
    negotiable: true,
    mileageKm: 25_800,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "Sedan",
    color: "Crystal Black",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: false,
    description:
      "Spacious Honda Accord with turbocharged engine and refined executive-sedan character.",
    features: [
      {
        category: "Comfort",
        items: ["Leather seats", "Power seats", "Dual-zone climate"],
      },
      {
        category: "Safety",
        items: ["Honda Sensing", "Adaptive cruise control"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-02-17",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("accord-1", UNSPLASH.honda2, "Honda Accord", true),
    ],
    ownerCount: 1,
    views: 527,
    inquiryCount: 11,
    createdAt: "2026-06-29T09:00:00.000Z",
    updatedAt: "2026-08-13T09:00:00.000Z",
  },

  {
    id: "v-1045",
    slug: "honda-pilot-2021",
    brand: "Honda",
    model: "Pilot",
    trim: "Elite",
    year: 2021,
    price: 5_200_000,
    negotiable: true,
    mileageKm: 31_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3500,
    condition: "excellent",
    bodyType: "SUV",
    color: "Modern Steel",
    registrationYear: 2022,
    location: "Bashundhara, Dhaka",
    status: "reserved",
    featured: false,
    description:
      "Three-row Honda Pilot Elite with strong V6 performance and premium family features.",
    features: [
      {
        category: "Comfort",
        items: ["8 seats", "Leather interior", "Panoramic roof"],
      },
      {
        category: "Safety",
        items: ["Honda Sensing", "Blind spot monitoring"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-03-05",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("pilot-1", UNSPLASH.honda, "Honda Pilot", true),
    ],
    ownerCount: 1,
    views: 491,
    inquiryCount: 9,
    createdAt: "2026-07-19T09:00:00.000Z",
    updatedAt: "2026-08-14T09:00:00.000Z",
  },

  // ============================================================
  // LAND ROVER — 3
  // ============================================================

  {
    id: "v-1046",
    slug: "land-rover-defender-2021",
    brand: "Land Rover",
    model: "Defender",
    trim: "110",
    year: 2021,
    price: 12_500_000,
    negotiable: true,
    mileageKm: 24_700,
    fuelType: "diesel",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Pangea Green",
    registrationYear: 2022,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Modern Land Rover Defender 110 combining serious off-road ability with premium comfort.",
    features: [
      {
        category: "Utility",
        items: ["Terrain Response", "All-wheel drive", "Air suspension"],
      },
      {
        category: "Comfort",
        items: ["Panoramic roof", "Leather seats"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-04-17",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("defender-1", UNSPLASH.landRover, "Land Rover Defender 110", true),
      img("defender-2", UNSPLASH.landRover2, "Land Rover Defender"),
    ],
    ownerCount: 1,
    views: 1057,
    inquiryCount: 23,
    createdAt: "2026-07-07T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z",
  },

  {
    id: "v-1047",
    slug: "range-rover-sport-2020",
    brand: "Land Rover",
    model: "Range Rover Sport",
    trim: "HSE",
    year: 2020,
    price: 15_500_000,
    negotiable: true,
    mileageKm: 28_600,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Santorini Black",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Range Rover Sport HSE with sophisticated luxury, commanding road presence and strong performance.",
    features: [
      {
        category: "Luxury",
        items: ["Windsor leather", "Panoramic roof", "Meridian audio"],
      },
      {
        category: "Technology",
        items: ["Touch Pro Duo", "360° camera"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-05-13",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("rrsport-1", UNSPLASH.landRover2, "Range Rover Sport HSE", true),
    ],
    ownerCount: 1,
    views: 893,
    inquiryCount: 19,
    createdAt: "2026-06-19T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "v-1048",
    slug: "range-rover-evoque-2021",
    brand: "Land Rover",
    model: "Range Rover Evoque",
    trim: "R-Dynamic",
    year: 2021,
    price: 21_000_000,
    negotiable: true,
    mileageKm: 19_300,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 2000,
    condition: "excellent",
    bodyType: "SUV",
    color: "Firenze Red",
    registrationYear: 2022,
    location: "Banani, Dhaka",
    status: "reserved",
    featured: false,
    description:
      "Stylish Range Rover Evoque R-Dynamic with compact luxury-SUV proportions and premium cabin.",
    features: [
      {
        category: "Comfort",
        items: ["Panoramic roof", "Heated seats", "Leather interior"],
      },
      {
        category: "Technology",
        items: ["Touch Pro", "360° camera"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-05-08",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("evoque-1", UNSPLASH.landRover, "Range Rover Evoque", true),
    ],
    ownerCount: 1,
    views: 621,
    inquiryCount: 12,
    createdAt: "2026-07-16T09:00:00.000Z",
    updatedAt: "2026-08-18T09:00:00.000Z",
  },

  // ============================================================
  // NISSAN — 3
  // ============================================================

  {
    id: "v-1049",
    slug: "nissan-gt-r-2020",
    brand: "Nissan",
    model: "GT-R",
    trim: "Premium",
    year: 2020,
    price: 4_800_000,
    negotiable: true,
    mileageKm: 17_900,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3800,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Solid Red",
    registrationYear: 2021,
    location: "Gulshan, Dhaka",
    status: "available",
    featured: true,
    description:
      "Iconic Nissan GT-R with twin-turbo V6 and advanced all-wheel-drive performance.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V6", "ATTESA AWD", "Launch control"],
      },
      {
        category: "Technology",
        items: ["Multi-function display", "Bose audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2021-04-09",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("gtr-1", UNSPLASH.nissan, "Nissan GT-R", true),
      img("gtr-2", UNSPLASH.nissan2, "Nissan GT-R exterior"),
    ],
    ownerCount: 1,
    views: 1432,
    inquiryCount: 32,
    createdAt: "2026-06-12T09:00:00.000Z",
    updatedAt: "2026-08-23T09:00:00.000Z",
  },

  {
    id: "v-1050",
    slug: "nissan-patrol-2021",
    brand: "Nissan",
    model: "Patrol",
    trim: "Platinum",
    year: 2021,
    price: 7_200_000,
    negotiable: true,
    mileageKm: 33_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 5600,
    condition: "excellent",
    bodyType: "SUV",
    color: "Champagne Silver",
    registrationYear: 2022,
    location: "Baridhara, Dhaka",
    status: "available",
    featured: true,
    description:
      "Full-size Nissan Patrol Platinum with V8 power, seven-seat luxury and serious road presence.",
    features: [
      {
        category: "Luxury",
        items: ["7 seats", "Premium leather", "Bose audio"],
      },
      {
        category: "Utility",
        items: ["4WD", "Hill descent control"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-03-21",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("patrol-1", UNSPLASH.nissan2, "Nissan Patrol", true),
    ],
    ownerCount: 1,
    views: 1088,
    inquiryCount: 26,
    createdAt: "2026-07-01T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "v-1051",
    slug: "nissan-z-2021",
    brand: "Nissan",
    model: "Z",
    trim: "Performance",
    year: 2021,
    price: 9_800_000,
    negotiable: true,
    mileageKm: 12_400,
    fuelType: "petrol",
    transmission: "automatic",
    engineCc: 3000,
    condition: "excellent",
    bodyType: "Coupe",
    color: "Ikazuchi Yellow",
    registrationYear: 2022,
    location: "Gulshan, Dhaka",
    status: "reserved",
    featured: true,
    description:
      "Modern Nissan Z Performance with twin-turbo V6 power and classic Z-car proportions.",
    features: [
      {
        category: "Performance",
        items: ["Twin-turbo V6", "Limited-slip differential"],
      },
      {
        category: "Technology",
        items: ["Digital instrument display", "Bose audio"],
      },
    ],
    history: [
      {
        id: "h1",
        date: "2022-06-07",
        label: "First registration",
        detail: "Registered in Dhaka Metro",
      },
    ],
    images: [
      img("nissan-z-1", UNSPLASH.nissan, "Nissan Z Performance", true),
    ],
    ownerCount: 1,
    views: 976,
    inquiryCount: 22,
    createdAt: "2026-07-23T09:00:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
  },
];

/**
 * Inventory summary
 *
 * 51 vehicles are represented in this local dataset.
 */
export const totalInventoryCount = vehicles.length;

export const totalInventoryValueBDT = vehicles.reduce(
  (total, vehicle) => total + vehicle.price,
  0,
);

export const newVehiclesThisWeek = 12;