import Select from "react-select";
import { useId } from "react";

export default function SelectFilter({ filter, setFilter, selectOption }: any) {
  return (
    <>
      <Select
        instanceId={useId()}
        value={filter}
        onChange={setFilter}
        options={selectOption}
      />
    </>
  );
}
