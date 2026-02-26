'use client';
import { useEffect, useMemo } from "react";
import Background from "../../GeneralComponents/Background";
import { useSagaDetail } from "./useSagaData";
import type { Props } from "./types";
import { SagaCardCarousel } from "./SagaCardCarousel";
import { LoadingScreen } from "../../GeneralComponents/LoadingScreen";
import SunnyGO from "@/assets/Sunny.gif";
import MapRoad from "@/assets/GeneralImages/OnePieceRoadMap.png";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
const SectionsPromise = import('./Sections');

const ArcsSection = dynamic(() =>
  SectionsPromise.then((mod) => mod.ArcsSection)
);
const CharactersSection = dynamic(() =>
  SectionsPromise.then((mod) => mod.CharactersSection)
);
const EpisodesSection = dynamic(() =>
  SectionsPromise.then((mod) => mod.EpisodesSection)
);
const LocationsSection = dynamic(() =>
  SectionsPromise.then((mod) => mod.LocationsSection)
);


export const SagaDetail = ({
  sagaId,
  backgroundImage,
  arcIds,
  characterIds,
  episodeIds,
  locationIds,
}: Props) => {
  const t  = useTranslations('sagaDetail');
  const currentLang = useLocale();

  const {
    saga,
    arcs,
    characters,
    episodes,
    locations,
    loadingData,
    loadingArcs,
    loadingCharacters,
    loadingEpisodes,
    loadingLocations,
    fetchData,
  } = useSagaDetail(
    sagaId,
    currentLang,
    arcIds,
    characterIds,
    episodeIds,
    locationIds
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cards = useMemo(() => [
    {
      title: saga?.title || '',
      text: t("includedArcs"),
      imageUrl: saga?.image || '',
      bottomImageUrl: saga?.banner || '',
    },
    {
      title: t("featuredCharacters"),
      text: ("charactersDescription"),
    },
    {
      title: t("mainEpisodes"),
      text: ("episodesDescription"),
    },
    {
      title: t("featuredLocations"),
      text: ("locationsDescription"),
    },
  ], [saga, t]);

  if (!saga || loadingData) {
    return (
      <LoadingScreen
        imageSrc={MapRoad}
        gifSrc={SunnyGO}
      />
    );
  }

  return (
    <Background image={backgroundImage}>
      <div className="flex justify-center items-center min-h-screen p-10">
        <SagaCardCarousel
          cards={cards}
          extraContent={(index) => {
            switch (index) {
              case 0:
                return <ArcsSection arcs={arcs} loading={loadingArcs} />;
              case 1:
                return (
                  <CharactersSection
                    characters={characters}
                    loading={loadingCharacters}
                  />
                );
              case 2:
                return (
                  <EpisodesSection
                    episodes={episodes}
                    loading={loadingEpisodes}
                  />
                );
              case 3:
                return (
                  <LocationsSection
                    locations={locations}
                    loading={loadingLocations}
                  />
                );
              default:
                return null;
            }
          }}
        />
      </div>
    </Background>
  );
};
