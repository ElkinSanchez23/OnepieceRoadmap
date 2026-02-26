'use client';

import { useTranslations } from 'next-intl';
import type { Arc, Character, Episode, Location } from './types';
import { motion } from 'framer-motion';

const SectionWrapper = ({
  title,
  loading,
  children,
}: {
  title: string;
  loading: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6"
  >
    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
    {loading ? <p className="text-gray-500">Loading...</p> : children}
  </motion.div>
);

export function ArcsSection({
  arcs,
  loading,
}: {
  arcs: Arc[];
  loading: boolean;
}) {
  const t = useTranslations('sagaDetail');

  return (
    <SectionWrapper title={t('includedArcs')} loading={loading}>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {arcs.map((arc) => (
          <li key={arc.id} className="ml-2">{arc.title}</li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export function CharactersSection({
  characters,
  loading,
}: {
  characters: Character[];
  loading: boolean;
}) {
  const t = useTranslations('sagaDetail');

  return (
    <SectionWrapper title={t('featuredCharacters')} loading={loading}>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {characters.map((char) => (
          <li key={char.id} className="ml-2">{char.name}</li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export function EpisodesSection({
  episodes,
  loading,
}: {
  episodes: Episode[];
  loading: boolean;
}) {
  const t = useTranslations('sagaDetail');

  return (
    <SectionWrapper title={t('mainEpisodes')} loading={loading}>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {episodes.map((ep) => (
          <li key={ep.id} className="ml-2">
            <span className="font-semibold text-gray-800">{ep.episode}</span> {ep.title}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export function LocationsSection({
  locations,
  loading,
}: {
  locations: Location[];
  loading: boolean;
}) {
  const t = useTranslations('sagaDetail');

  return (
    <SectionWrapper title={t('featuredLocations')} loading={loading}>
      {locations.length > 0 ? (
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {locations.map((loc) => (
            <li key={loc.id} className="ml-2">{loc.name}</li>
          ))}
        </ul>
      ) : (
        <ul className="list-disc list-inside text-gray-500">
          <li>{t('noLocations')}</li>
        </ul>
      )}
    </SectionWrapper>
  );
}
