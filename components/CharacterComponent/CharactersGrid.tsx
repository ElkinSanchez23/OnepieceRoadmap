"use client";

import { Character } from "@/services/getCharacters";
import CharacterCard from "./charactersCard";

type Props = {
  characters: Character[];
  onSelect: (id: number) => void;
};

export default function CharactersGrid({ characters, onSelect }: Props) {
  return (
    <ul
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      role="list"
    >
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
