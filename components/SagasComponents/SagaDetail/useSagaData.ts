import { useState, useCallback } from "react";
import {
  getSagaById,
  getArcsBySagaId,
  getCharactersBySagaId,
  getEpisodesBySagaId,
} from "../../../services/sagasService";
import { Arc, Character, Episode, Location, Saga } from "./types";
import { filterArcs } from "./SagaArcs";
import { filterCharacters } from "./SagaCharacters";
import { fetchEpisodes } from "./SagaEpisodes";
import { fetchLocations } from "./SagaLocations";

const supportedLangs = ["en", "fr"];

export function useSagaDetail(
  sagaId: number,
  lang: string,
  arcIds?: number[],
  characterIds?: number[],
  episodeIds?: number[],
  locationIds?: number[]
) {
  const [saga, setSaga] = useState<Saga | null>(null);
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingArcs, setLoadingArcs] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    setSaga(null);
    setArcs([]);
    setCharacters([]);
    setEpisodes([]);
    setLocations([]);
    setLoadingArcs(true);
    setLoadingCharacters(true);
    setLoadingEpisodes(true);
    setLoadingLocations(true);

    try {
      const apiLang = supportedLangs.includes(lang) ? lang : "en";

      const [sagaData, arcsData, charactersData] = await Promise.all([
        getSagaById(sagaId, apiLang),
        getArcsBySagaId(sagaId, apiLang),
        getCharactersBySagaId(sagaId, apiLang),
      ]);
      setSaga(sagaData);

      setArcs(filterArcs(arcsData, arcIds));
      setLoadingArcs(false);

      setCharacters(filterCharacters(charactersData, characterIds));
      setLoadingCharacters(false);

      const episodesData = await fetchEpisodes(
        sagaData.title,
        sagaId,
        lang,
        episodeIds,
        getEpisodesBySagaId
      );
      setEpisodes(episodesData);
      setLoadingEpisodes(false);

      const locationsData = await fetchLocations(locationIds, apiLang);
      setLocations(locationsData);
      setLoadingLocations(false);
    } catch (error) {
      console.error("Error fetching saga data:", error);
      setLoadingArcs(false);
      setLoadingCharacters(false);
      setLoadingEpisodes(false);
      setLoadingLocations(false);
    } finally {
      setLoadingData(false);
    }
  }, [lang, sagaId, arcIds, characterIds, episodeIds, locationIds]);

  return {
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
  };
}
