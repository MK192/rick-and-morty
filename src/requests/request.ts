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
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageParam}&name=${nameFilter}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export const getSingleCharacter = async (id: string | undefined) => {
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
