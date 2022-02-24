import React, { memo } from "react";
import GenericOutput from "../../outputs/GenericOutput";

const CreateUsableOutputs: React.FC<{ data: any }> = ({ data }) =>
  data.outputs.map((output: any, i: number) => {
    switch (output.type) {
      // case 'numpy::2d':
      //   return (
      //     <ImageOutput key={i} index={i} data={data} label={output.label} />
      //   );
      default:
        return (
          <GenericOutput key={i} index={i} label={output.label} data={data} />
        );
    }
  });

export default memo(CreateUsableOutputs);
