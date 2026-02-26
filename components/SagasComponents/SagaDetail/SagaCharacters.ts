import { Character } from "./types";

export function filterCharacters(
  charactersData: Character[],
  characterIds: number[] | undefined
): Character[] {
  return characterIds
    ? charactersData.filter((char) => characterIds.includes(char.id))
    : charactersData.slice(0, 5);
}
