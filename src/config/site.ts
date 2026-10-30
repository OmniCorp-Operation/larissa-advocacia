export const site = {
  name: "Larissa Ribeiro",
  role: "Paralegal | Non attorney",
  brand: "Berman Law Group",
  // TODO: domínio final em NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/images/og-larissa.jpg",
} as const;
