import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router";

//components
import CharacterCard from "../../components/CharacterCard";

//request
import { getCharacters } from "../../requests/request";

//hooks
import useDebounce from "../../hooks/useDebounce";

type Props = {
  nameFilter: string;
};
export default function CharacterList({ nameFilter }: Props) {
  const debouncedFilter = useDebounce(nameFilter, 500);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["characters", debouncedFilter],
    queryFn: ({ pageParam = 0 }) => getCharacters({ pageParam, nameFilter }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const params = new URL(lastPage.info.next).searchParams;
      return Number(params.get("page"));
    },
  });

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
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {data?.pages.map((page) =>
          page.results.map((character) => (
            <Link key={character.id} to={`/characters/${character.id}`}>
              <CharacterCard character={character} />
            </Link>
          ))
        )}
      </div>
      <div
        ref={loaderRef}
        className="h-10 mt-10 flex justify-center items-center"
      >
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
