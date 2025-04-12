import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

//components
import CharacterCard from "../../components/CharacterCard";

//request
import { getResidents } from "../../requests/request";

type Props = {
  characterIds: string[];
};

export default function ResidentList({ characterIds }: Props) {
  const BATCH_SIZE = 10;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["residents", characterIds],

    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * BATCH_SIZE;
      const end = start + BATCH_SIZE;
      const batch = characterIds.slice(start, end);

      if (batch.length === 0) {
        return { characters: [], nextPage: undefined };
      }

      const characters = await getResidents(batch);
      return {
        characters,
        nextPage: pageParam + 1,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

  const characters = data?.pages.flatMap((page) => page.characters) ?? [];

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {characters?.map((character) => (
            <Link key={character.id} to={`/character-single/${character.id}`}>
              <CharacterCard character={character} />
            </Link>
          ))}
        </div>
        <div
          ref={loaderRef}
          className="h-10 mt-10 flex justify-center items-center"
        >
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
}
