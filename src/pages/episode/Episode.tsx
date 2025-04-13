import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

//components
import EpisodeCharacterList from "./EpisodeCharacterList";

//request
import { getSingleEpisode } from "../../requests/request";

export default function Episode() {
  const { id } = useParams();

  const {
    data: episode,
    isPending,
    error,
  } = useQuery({
    queryKey: ["episode", id],
    queryFn: () => getSingleEpisode(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: Infinity,
  });

  const charactersIds = episode?.characters?.map(
    (episode: string) => episode.split("/").pop() as string
  );

  if (isPending) return <p>Loading Episode Info...</p>;
  if (error) return <p className="text-red-500">Error while fetching info</p>;

  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-semibold text-blue-500">
          {episode?.name}
        </h1>
        <p className="font-medium">
          <span>Air Date : </span>
          {episode?.air_date}
        </p>
        <p className="font-medium">
          <span>Episode : </span>
          {episode?.episode}
        </p>
        <EpisodeCharacterList characterIds={charactersIds} />
      </div>
    </>
  );
}
