"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getCharacterById, Character } from "@/services/getCharacters";
import { mugiwaraImages } from "@/assets/mugiwaraImages2";
import { LoadingScreen } from "@/components/GeneralComponents/LoadingScreen";
import WantedBG from "@/assets/wanted-bg.jpg";
import Background from "@/components/GeneralComponents/Background";
import MugiFlag from "@/assets/GeneralImages/MugiFlag.jpeg";
import CrewInfo from "./CrewInfo";
import SunnyGO from "@/assets/Sunny.gif";
import MapRoad from "@/assets/GeneralImages/OnePieceRoadMap.png";
import CharacterImage from "./CharacterImage";
import FruitInfo from "./FruitInfo";
type Props = {
  characterId: number;
};
export default function CharacterDetail({ characterId }: Props) {
  const t = useTranslations("character");
  const locale = useLocale();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    getCharacterById(characterId, locale).then(setCharacter);
  }, [characterId, locale]);

  if (!character) return (
    <LoadingScreen imageSrc={MapRoad} gifSrc={SunnyGO} />
  );

  const normalizedKey = character.name.toLowerCase().replace(/[\s\-\.']/g, "");
  const localImage = mugiwaraImages[normalizedKey];

  return (
    <Background image={MugiFlag}>
      <main className="flex items-center justify-center min-h-[80vh] p-4 sm:p-6" aria-label={t("mainContentLabel")}>
        <div className="relative w-full max-w-6xl bg-[#fdf5e6] border-[10px] border-[#d2b48c] rounded-md shadow-xl text-brown-900 font-serif px-4 sm:px-6 py-4 overflow-y-auto flex flex-col md:flex-row gap-6 sm:gap-8 items-center"
          style={{
            backgroundImage: `url(${WantedBG.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 0 10px #aa8c66",
          }}
        >
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center" aria-label={t("characterImageLabel", { name: character.name })}>
            <CharacterImage name={character.name} imageSrc={localImage} />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-full w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">{character.name}</h1>
            <p><strong>{t("job")}:</strong> {character.job}</p>
            <p><strong>{t("size")}:</strong> {character.size}</p>
            <p><strong>{t("age")}:</strong> {character.age}</p>
            <p><strong>{t("bounty")}:</strong> <span className="text-red-700">{character.bounty}</span></p>

            {character.status && (
              <p><strong>{t("status")}:</strong> {character.status}</p>
            )}

            <CrewInfo crew={character.crew} />
            <FruitInfo fruit={character.fruit} />
          </div>
        </div>
      </main>
    </Background>
  );
}
