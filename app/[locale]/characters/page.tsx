"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllCharacters, Character } from "@/services/getCharacters";
import CharactersGrid from "@/components/characterComponent/charactersGrid";
import Background from "@/components/generalComponents/background";
import GeneralOnepiece from "@/assets/generalImages/one_Piece.png";
import { useTranslations } from "next-intl";
import { LoadingScreen } from "@/components/generalComponents/loadingScreen";
import SunnyGO from "@/assets/sunny.gif";
import MapRoad from "@/assets/generalImages/onePieceRoadMap.png";

export default function CharactersPage() {
  const router = useRouter();
  const t = useTranslations("home");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCharacters("en", 10).then((data) => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen w-screen bg-blue-800 text-white text-center p-6"
        aria-busy="true"
        aria-live="polite"
      >
        <LoadingScreen imageSrc={MapRoad} gifSrc={SunnyGO} />
      </div>
    );
  }

  return (
    <Background image={GeneralOnepiece}>
      <main
        className="bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg p-6 w-full max-w-[950px] mx-auto text-brown-800"
        style={{ boxShadow: "inset 0 0 30px #7b4c20" }}
      >
        <h1 className="text-xl font-bold mb-4 text-center">{t("mugiwaras")}</h1>
        <CharactersGrid
          characters={characters}
          onSelect={(id) => router.push(`/characters/${id}`)}
        />
      </main>
    </Background>
  );
}
