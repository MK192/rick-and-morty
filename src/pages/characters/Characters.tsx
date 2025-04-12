import { useState } from "react";

//components
import CharacterList from "./CharacterList";
import FilterInput from "../../components/FilterInput";

export default function Characters() {
  const [nameFilter, setNameFilter] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };
  return (
    <div>
      <FilterInput
        placeholder="Filter Characters..."
        value={nameFilter}
        onChangeHandler={handleSearch}
      />
      <CharacterList nameFilter={nameFilter} />
    </div>
  );
}
