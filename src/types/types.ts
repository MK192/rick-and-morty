type Location = {
  name: string;
  url: string;
};

type Origin = {
  name: string;
  url: string;
};

export type Character = {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Origin;
  species: string;
  status: string;
  type: string;
  url: string;
};
