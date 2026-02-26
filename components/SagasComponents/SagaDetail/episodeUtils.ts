export const normalizeSlug = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

export const slugMap: Record<string, string> = {
  "Water Seven / CP9": "water-seven",
  "East Blue": "eastblue",
  Alabasta: "alabasta",
  "Celestial Island": "skypiea",
  "Water 7": "water-seven",
  "Enies Lobby": "water-seven",
  "Thriller Bark": "thriller-bark",
  "War at the top": "marineford",
  "Île des Hommes-Poissons": "isla-gyojin",
  "Dressrosa / Pirate Alliance": "dressrosa",
  "Four Emperors": "whole-cake",
  "Final Saga": "wano",
};
