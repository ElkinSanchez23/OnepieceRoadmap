"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getCharacterById, Character } from "@/services/getCharacters";
import CharacterDetail from "@/components/CharacterComponent/CharactersDetail";
import { LoadingScreen } from "@/components/GeneralComponents/LoadingScreen";
import loadingImageSrc from "@/assets/GeneralImages/OnePieceRoadMap.png";
import loadingGifSrc from "@/assets/Sunny.gif";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const locale = useLocale();
  const t = useTranslations("character");
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    setLoading(true);
    getCharacterById(Number(id), locale)
      .then(setCharacter)
      .finally(() => setLoading(false));
  }, [id, locale]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <LoadingScreen imageSrc={loadingImageSrc} gifSrc={loadingGifSrc} />
      </div>
    );
  }

  if (!character) {
    return (
      <p className="text-center mt-10 text-red-600" role="alert">
        {t("notFound")}
      </p>
    );
  }

  return (
    <>
      <main>
        <CharacterDetail characterId={Number(id)} />
      </main>
    </>
  );
}
