import { Link } from "react-router";

type Props = {
  episodeList: string[];
};
export default function EpisodeList({ episodeList }: Props) {
  const episodeListFormated = episodeList?.map(
    (url) => url.split("/").pop() as string
  );

  return (
    <ul className="flex flex-wrap gap-2 text-base mt-2">
      {episodeListFormated?.map((episode: string) => (
        <Link key={episode} to={`/episode/${episode}`}>
          <li>{episode}</li>
        </Link>
      ))}
    </ul>
  );
}
