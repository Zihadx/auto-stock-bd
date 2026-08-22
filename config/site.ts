export const siteConfig = {
  name: "AutoStock BD",
  tagline: "Every vehicle, inspected. Every price, honest.",
  whatsappNumber: "+8801711223344",
  phone: "+8801711223344",
  email: "hello@autostockbd.com",
  address: "House 14, Road 27, Banani, Dhaka 1213",
};

export const publicNav = [
  { label: "Inventory", href: "/inventory" },
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const vehicleBrands = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mitsubishi",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Hyundai",
  "Kia",
  "Mazda",
  "Suzuki",
] as const;
