import React, { memo, useContext } from "react";
import { TextField } from "@mui/material";
import { GlobalContext } from "../helpers/GlobalNodeState";
import InputContainer from "./InputContainer";

const NumericalInput: React.FC<{
  label: string;
  hasHandle?: boolean;
  data: any;
  index: number;
  def?: number;
  min?: number;
  max?: number;
  precision?: number;
  step?: number;
}> = ({ label, data, index, def, hasHandle = true, ...props }) => {
  const { id } = data;
  const { useInputData, useNodeLock } = useContext(GlobalContext);
  const [input, setInput] = useInputData(id, index);
  const [isLocked] = useNodeLock(id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberAsNumber = Number(value);

    if (data?.inputs[index]?.type.includes("odd")) {
      // Make the number odd if need be
      setInput(String(numberAsNumber + (1 - (numberAsNumber % 2))));
    } else {
      setInput(value);
    }
  };

  return (
    <InputContainer id={id} index={index} hasHandle={hasHandle}>
      <TextField
        size="small"
        defaultValue={def}
        label={label}
        inputProps={{ ...props, step: props.step ?? 1 }}
        value={String(input)}
        onChange={handleChange}
        draggable={false}
        className="nodrag"
        disabled={isLocked}
      />
    </InputContainer>
  );
};

export default memo(NumericalInput);
