import api from './api';

export interface Character {
  id: number;
  name: string;
  job: string;
  size: string;
  age: string;
  bounty: string;
  status: string;
  
  crew: {
    id: number;
    name: string;
    roman_name: string;
    total_prime: string;
    is_yonko: boolean;
  };
  
  fruit?: {
    id: number;
    name: string;
    type: string;
    filename: string;
    roman_name: string;
    description: string;
  };

}

export const getAllCharacters = async (lang = 'en', limit?: number): Promise<Character[]> => {
  const response = await api.get(`/characters/${lang}`);
  const data = response.data.map((char: any): Character => ({
    id: char.id,
    name: char.name,
    job: char.job,
    size: char.size,
    age: char.age,
    bounty: char.bounty,
    status: char.status,
    crew: {
      id: char.crew?.id,
      name: char.crew?.name,
      roman_name: char.crew?.roman_name || 'Unknown',
      total_prime: char.crew?.total_prime,
      is_yonko: char.crew?.is_yonko ?? false,
    },
    fruit: char.fruit
      ? {
          id: char.fruit.id,
          name: char.fruit.name,
          type: char.fruit.type,
          filename: char.fruit.filename,
          roman_name: char.fruit.roman_name,
          description: char.fruit.description,
        }
      : undefined,
  }));

  return limit ? data.slice(0, limit) : data;
};

export const getCharacterById = async (
  id: number,
  lang = 'en'
): Promise<Character | null> => {

  const apiLang = ['en', 'fr'].includes(lang) ? lang : 'en';

  try {
    const response = await api.get(`/characters/${apiLang}/${id}`);
    const char = response.data;

    return {
      id: char.id,
      name: char.name,
      job: char.job,
      size: char.size,
      age: char.age,
      bounty: char.bounty,
      status: char.status,
      crew: {
        id: char.crew?.id,
        name: char.crew?.name,
        roman_name: char.crew?.roman_name || 'Unknown',
        total_prime: char.crew?.total_prime,
        is_yonko: char.crew?.is_yonko ?? false,
      },
      fruit: char.fruit
        ? {
            id: char.fruit.id,
            name: char.fruit.name,
            type: char.fruit.type,
            filename: char.fruit.filename,
            roman_name: char.fruit.roman_name,
            description: char.fruit.description,
          }
        : undefined,
    };
  } catch (error) {
    console.error(`Error al obtener el personaje con id "${id}":`, error);
    return null;
  }
};