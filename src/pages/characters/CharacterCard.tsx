//type
import { Character } from "../../types/types";

type Props = {
  character: Character;
};
export default function CharacterCard({ character }: Props) {
  return (
    <figure className="w-[256px] h-[370px] p-4 rounded shadow-[0px_4px_5px_-2px_#2178cf]">
      <img
        src={character.image}
        alt={character.name}
        className="w-full max-h-64 rounded"
      />
      <div className="flex flex-col gap-2 text-sm items-start px-6 py-2 font-medium">
        <p className="w-full text-start truncate">
          <span className="">Name:</span> {character.name}
        </p>
        <p className="w-full text-start truncate">
          {" "}
          <span>Gender: </span>
          {character.gender}
        </p>
        <p className="w-full text-start truncate">
          <span>Species: </span>
          {character.species}
        </p>
        <p className="w-full text-start truncate">
          <span>Status: </span>
          {character.status}
        </p>
      </div>
    </figure>
  );
}
