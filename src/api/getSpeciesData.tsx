import axios from 'axios';
import { SpeciesData } from '../models/types';

export const getSpeciesData = async (selectedSpecies: string): Promise<SpeciesData> => {
  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const apiUrl = `https://www.fishwatch.gov/api/species/${selectedSpecies}`;

  try {
    const res = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
    const data = res.data[0];

    return {
      scientific_name: data['Scientific Name'],
      habitat: data.Habitat,
      population_status: data['Population Status'],
      research: data.Research,
      photo: data['Species Illustration Photo'],
      last_update: data.last_update,
    };
  } catch (error) {
    console.log(`There was an error retrieving species data: ${error}`);
    return {} as SpeciesData;
  }
};
