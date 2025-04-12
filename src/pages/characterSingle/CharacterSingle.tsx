import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

//components
import EpisodeList from "../characterSingle/EpisodeList";

//request
import { getSingleCharacter } from "../../requests/request";

export default function CharacterSingle() {
  const { id } = useParams();

  const {
    data: character,
    isPending,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: () => getSingleCharacter(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/12 h-4/12 min-w-64 min-h-64">
        <img
          src={character?.image}
          alt={character?.name}
          className="w-full rounded mt-10"
        />
        <h1 className="font-bold text-2xl">Character Info</h1>
        <div className="flex flex-col items-start justify-end">
          <p className="w-full truncate text-start">
            <span className="font-medium">Name: </span>
            {character?.name}
          </p>
          <p className="w-full truncate text-start">
            <span className="font-medium">Gender: </span>
            {character?.gender}
          </p>

          <p className="w-full truncate text-start">
            <span className="font-medium">Species: </span>
            {character?.species}
          </p>
          <p className="w-full truncate text-start">
            <span className="font-medium">Origin: </span>
            {character?.origin.name}
          </p>
          <Link to={`/location/${character.location.name}`}>
            <p className="w-full truncate text-start text-blue-500">
              <span className="font-medium">Location: </span>
              {character?.location.name}
            </p>
          </Link>
          <p className="w-full truncate text-start">
            <span className="font-medium">Status: </span>
            {character?.status}
          </p>
        </div>
        <h2 className="font-bold text-xl">Episode List</h2>
        <EpisodeList episodeList={character.episode} />
      </div>
    </div>
  );
}
