export const sectionIds = ["hero", "how", "about", "coverage", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];

export const navSectionIds = ["how", "about", "contact"] as const satisfies readonly SectionId[];

export type NavSectionId = (typeof navSectionIds)[number];
