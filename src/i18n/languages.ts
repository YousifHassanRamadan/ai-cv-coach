export const supportedLngs = ["en", "ar"] as const;
export type AppLanguage = (typeof supportedLngs)[number];

export const rtlLanguages: AppLanguage[] = ["ar"];

export const fallbackLng: AppLanguage = "en";

export const defaultNS = "translation";

export const isAppLanguage = (lng: string): lng is AppLanguage => {
  return supportedLngs.includes(lng as AppLanguage);
};
