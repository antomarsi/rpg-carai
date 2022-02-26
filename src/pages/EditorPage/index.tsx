import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { NodeEditor, RootEngine, useRootEngine } from "flume";

import flumeConfig from "../../lib/flume/config";
import flumeEngine from "../../lib/flume/engine";
import { PlayerContext } from "./../../hooks/PlayerState";
import { NodeType } from '../../lib/flume/nodes';
import { PortType } from '../../lib/flume/ports';

const customHook = (nodes: any, engine: RootEngine<NodeType, PortType, any>, context: any, options?: any) => {
  console.log("Running Engine")
  return Object.keys(nodes).length ? engine.resolveRootNode(nodes, {...options, context }) : {};
}

const EditorPage: React.FC = () => {
  const [nodes, setNodes] = React.useState({});
  const { character } = React.useContext(PlayerContext);

  const resultFinalAttributes = customHook(nodes, flumeEngine, {
    character,
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={9}>
          <NodeEditor
          debug
            nodeTypes={flumeConfig.nodeTypes}
            portTypes={flumeConfig.portTypes}
            nodes={nodes}
            onChange={setNodes}
            defaultNodes={[{ type: "finalAttributes" }]}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>{JSON.stringify(resultFinalAttributes)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditorPage;
