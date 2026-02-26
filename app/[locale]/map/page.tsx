"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import MapImage from "@/assets/Map/map_one_piece.png";
import MapTitle from "@/components/Map/MapTitle";
import { MapMarker } from "@/components/Map/MapMarker";
import { mapLocations } from "@/data/mapLocations";
import IslandModal from "@/components/Map/IslandModal";
import { useTranslations } from "next-intl";
import { MapTypeIndicator } from "@/components/Map/MapTypeIndicator";

const useIslandSlug = () => {
  const searchParams = useSearchParams();
  return searchParams.get("island");
};

const useLastIslandEffect = (
  islandSlug: string | null,
  router: ReturnType<typeof useRouter>
) => {
  useEffect(() => {
    if (!islandSlug && typeof window !== "undefined") {
      const lastIsland = localStorage.getItem("lastIsland");
      if (lastIsland) {
        const params = new URLSearchParams(window.location.search);
        params.set("island", lastIsland);
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [islandSlug, router]);
};

const useIslandData = (islandSlug: string | null) => {
  return mapLocations.find(
    (loc) => loc.type === "island" && loc.path.replace("/", "") === islandSlug
  );
};

type IslandCard = {
  id: string;
  title: string;
  description: string;
};

function isIslandCard(obj: unknown): obj is IslandCard {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const card = obj as Partial<IslandCard>;
  return (
    typeof card.id === "string" &&
    typeof card.title === "string" &&
    typeof card.description === "string"
  );
}

type TranslationFunction = {
(key: string,options?: Record<string, string | number | boolean>): string;
has: (key: string) => boolean;
raw: (key:string) => unknown;


};

const useCards = (
  tinsland: TranslationFunction,
  islandPath: string
): IslandCard[] | undefined => {
  return useMemo(() => {
    if (!islandPath) return undefined;
    const key = `${islandPath}.cards`;

    if (tinsland.has?.(key)) {
      const raw = tinsland.raw?.(key);

      if (Array.isArray(raw) && raw.every(isIslandCard)) {
        return raw;
      }
    }

    console.warn(
      `No translation found or invalid format for cards of ${islandPath}`
    );
    return undefined;
  }, [tinsland, islandPath]);
};

const Map = () => {
  const t = useTranslations("map");
  const tinsland = useTranslations(
    "importantPlaces"
  ) as TranslationFunction;
  const router = useRouter();
  const islandSlug = useIslandSlug();
  const [filterType, setFilterType] = useState<"all" | "saga" | "island">(
    "all"
  );

  useLastIslandEffect(islandSlug, router);

  const islandData = useIslandData(islandSlug);
  const islandPath = islandData?.path.replace("/", "") || "";
  const cards = useCards(tinsland, islandPath);

  const closeModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("island");
    localStorage.removeItem("lastIsland");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <main
      role="main"
      aria-label={t("ariaLabel", {
        defaultTranslation: "Interactive map of the One Piece world",
      })}
      className="w-full h-screen overflow-auto bg-gray-200"
    >
      <div className="relative aspect-[2560/1748] min-w-full min-h-full">
        <MapTitle />
        <MapTypeIndicator
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <Image
          src={MapImage}
          alt={t("altText", {
            defaultTranslation:
              "Illustrated map showing all islands and sagas from the One Piece world",
          })}
          fill
          className="absolute top-0 left-0 object-contain"
          priority
        />

        {mapLocations
          .filter((loc) => filterType === "all" || loc.type === filterType)
          .map((loc, index) => (
            <MapMarker
              key={index}
              name={loc.name}
              coords={loc.coords}
              path={loc.path}
              index={index}
              type={loc.type}
            />
          ))}

        {islandData && (
          <IslandModal
            isOpen={true}
            onClose={closeModal}
            islandName={tinsland(`${islandPath}.name`, {
              defaultTranslation: islandData.name,
            })}
            description={tinsland(`${islandPath}.description`, {
              defaultTranslation: "",
            })}
            cards={cards}
          />
        )}
      </div>
    </main>
  );
};

export default Map;
