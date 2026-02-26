'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Character } from "@/services/getCharacters";
import { mugiwaraImages } from "@/assets/mugiwaraImages";

type Props = {
  character: Character;
  onSelect: (id: number) => void;
};

export default function CharacterCard({ character, onSelect }: Props) {
  const t = useTranslations("character");
  const normalizedKey = character.name.toLowerCase().replace(/[\s\-\.']/g, "");
  const localImage = mugiwaraImages[normalizedKey];

  const handleClick = () => onSelect(character.id);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(character.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("aria.viewDetails", { name: character.name })}
      className="bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer overflow-hidden transition border border-yellow-300"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="relative w-full h-44">
        {localImage ? (
          <Image
            src={localImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={t("characterImageAlt", { name: character.name })}
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500"
            aria-hidden="true"
          >
            {t("imageUnavailable", { name: character.name })}
          </div>
        )}
      </div>
      <div className="p-3 text-center">
        <h2 className="text-md font-semibold text-gray-800">{character.name}</h2>
        <p className="text-sm text-gray-500">{character.job}</p>
      </div>
    </div>
  );
}
