export const stepIds = ["contact", "guidance", "referral", "followUp"] as const;

export type StepId = (typeof stepIds)[number];
