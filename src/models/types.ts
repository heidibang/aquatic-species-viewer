interface SpeciesPhoto {
  src: string;
  alt: string;
  title: string;
}

export interface SpeciesData {
  scientific_name: string;
  habitat: string;
  population_status: string;
  research: string;
  photo: SpeciesPhoto;
  last_update: string;
}
