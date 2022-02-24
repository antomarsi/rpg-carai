import React, { memo } from "react";
import NodeWrapper from "./NodeWrapper";
import { Stack, Typography, Box } from "@mui/material";
import NodeHeader from "./NodeHeader";
import BottomArea from "./BottomArea";
import GenericInput from "../../inputs/GenericInput";
import NumberInput from "../../inputs/NumberInput";

const CreateUsableInputs: React.FC<{ data: any }> = ({ data }) =>
  data.inputs.map((input: any, i: number) => {
    switch (input.type) {
      case "number::any":
        return (
          <NumberInput
            key={i}
            index={i}
            data={data}
            label={input.label}
            min={input.min}
            step={input.step}
          />
        );
      case "number::integer":
        return (
          <NumberInput
            key={i}
            index={i}
            data={data}
            label={input.label}
            min={input.min}
            precision={0}
          />
        );
      case "number::integer::odd":
        return (
          <NumberInput
            key={i}
            index={i}
            data={data}
            label={input.label}
            min={1}
            precision={0}
            def={1}
            step={2}
          />
        );
      default:
        return (
          <GenericInput key={i} index={i} label={input.label} data={data} />
        );
    }
  });

export default memo(CreateUsableInputs);
