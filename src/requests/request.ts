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

export const getResidents = async (ids: string[]): Promise<Character[]> => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character/${ids.join(",")}`
  );
  return Array.isArray(res.data) ? res.data : [res.data]; // API returns a single object if only one ID
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

export const getSingleLocation = async (id: string | undefined) => {
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/location/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
