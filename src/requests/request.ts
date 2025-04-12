import axios from "axios";

//types
import { Character } from "../types/types";

//GET

type APIResponse = {
  info: {
    next: string | null;
  };
  results: Character[];
};

export const getCharacters = async ({
  pageParam = 1,
  nameFilter = "",
}): Promise<APIResponse> => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${pageParam}&name=${nameFilter}`
  );

  return res.data;
};
