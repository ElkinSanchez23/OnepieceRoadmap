import api from './api';


export const getSagaById = async (id: number, lang = 'en') => {
  const response = await api.get(`/sagas/${lang}/${id}`);
  return response.data;
};

export const getArcsBySagaId = async (id: number, lang = 'en') => {
  const response = await api.get(`/arcs/${lang}`, {
    params: { saga: id }
  });
  return response.data;
};

export const getCharactersBySagaId = async (
  id: number,
  lang = 'en',
  limit?: number
) => {
  const response = await api.get(`/characters/${lang}`, {
    params: { saga: id }
  });

  const characters = response.data;

  return limit ? characters.slice(0, limit) : characters;
};

export const getEpisodesBySagaId = async (id: number, lang = 'en') => {
  const response = await api.get(`/episodes/${lang}`, {
    params: { saga: id }
  });
  return response.data;
};

export const getLocationById = async (locationId: number, lang = 'en') => {
  try {
    const response = await api.get(`/locates/${lang}/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la ubicación con ID ${locationId}:`, error);
    return null;
  }
};
