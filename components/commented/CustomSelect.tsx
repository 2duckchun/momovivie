import Select from "react-select";
import { useId } from "react";

export default function CustomSelect({ option, setOption, initOption }: any) {
  return (
    <Select
      instanceId={useId()}
      value={option}
      onChange={setOption}
      options={initOption}
    />
  );
}
