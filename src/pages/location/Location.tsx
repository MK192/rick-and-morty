import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//components
import ResidentList from "./ResidentList";

//request
import { getSingleLocation } from "../../requests/request";

export default function Location() {
  const { id } = useParams();

  const {
    data: location,
    isPending,
    error,
  } = useQuery({
    queryKey: ["location", id],
    queryFn: () => getSingleLocation(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: Infinity,
  });

  const residentIds = location?.residents?.map(
    (resident: string) => resident.split("/").pop() as string
  );

  if (isPending) return <p>Loading Location...</p>;
  if (error)
    return <p className="text-red-500">Error while fetching Location</p>;

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-2xl font-semibold text-blue-500">{location?.name}</h1>
      <p className="font-medium">
        <span>Dimension : </span>
        {location?.dimension}
      </p>
      <ResidentList characterIds={residentIds} />
    </div>
  );
}
