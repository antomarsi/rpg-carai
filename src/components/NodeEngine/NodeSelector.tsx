import React, { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider, InputAdornment, Stack, Tabs, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createRepresentativeNode } from './helpers/createNodeTypes';

const onDragStart = (
  event: React.DragEvent,
  nodeCategory: string,
  node: any
) => {
  event.dataTransfer.setData("application/reactflow/type", node.name);
  event.dataTransfer.setData(
    "application/reactflow/inputs",
    JSON.stringify(node.inputs)
  );
  event.dataTransfer.setData(
    "application/reactflow/outputs",
    JSON.stringify(node.outputs)
  );
  event.dataTransfer.setData("application/reactflow/category", nodeCategory);
  event.dataTransfer.setData(
    "application/reactflow/offsetX",
    event.nativeEvent.offsetX.toString()
  );
  event.dataTransfer.setData(
    "application/reactflow/offsetY",
    event.nativeEvent.offsetY.toString()
  );
  // eslint-disable-next-line no-param-reassign
  event.dataTransfer.effectAllowed = "move";
};

// eslint-disable-next-line react/prop-types
const NodeSelector: React.FC<{
  data: {
    category: string;
    nodes: any;
  }[];
  height: number;
}> = ({ data, height }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  const [namespaces, setNamespaces] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const set: Record<string, any[]> = {};
    data?.forEach(({ category, nodes }) => {
      nodes
        .sort((a: any, b: any) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        )
        .forEach((node: any) => {
          const namespace = node.name.split("::")[0];
          if (!set[category]) {
            set[category] = [];
          }
          if (!set[category].includes(namespace)) {
            set[category].push(namespace);
          }
        });
    });
    setNamespaces(set);
  }, [data]);

  return (
    <Box
      sx={{
        width: "auto",
        height: "100%",
      }}
    >
      <TextField
        variant="outlined"
        onChange={handleChange}
        placeholder="Buscar..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          height: height - 165,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "6px",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "8px",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: grey[800],
          },
        }}
      >
        {data.map(({ category, nodes }, i) => (
          <Accordion key={i}>
            <AccordionSummary
              key={category}
              expandIcon={<ExpandMoreIcon />}
              id={category}
              aria-controls={category}
            >
              <Typography>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {namespaces[category] &&
                  namespaces[category]
                    // eslint-disable-next-line max-len
                    // This is super terrible but I have no better way of filtering for these at the moment
                    // I could probably cache this in the namespace object but w/e
                    .filter((namespace) =>
                      `${category} ${nodes
                        .filter((e: any) => e.name.includes(namespace))
                        .map((e: any) => e.name)
                        .join(" ")}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((namespace) => (
                      <React.Fragment>
                        <Grid item xs={12}>
                          <Stack direction="row">
                            <Divider />
                            <Typography>{namespace}</Typography>
                            <Divider />
                          </Stack>
                        </Grid>
                        {nodes
                          .filter((e: any) =>
                            `${category} ${e.name}`
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .filter((e: any) =>
                            e.name
                              .toUpperCase()
                              .includes(namespace.toUpperCase())
                          )
                          .sort((a: any, b: any) =>
                            a.name
                              .toUpperCase()
                              .localeCompare(b.name.toUpperCase())
                          )
                          .map((node: any) => (
                            <Grid item xs={12} sm={12} md={4}>
                              <Tooltip title={node.description}>
                                <Box
                                  draggable
                                  onDragStart={(event) =>
                                    onDragStart(event, category, node)
                                  }
                                >
                                  {createRepresentativeNode(category, node)}
                                </Box>
                              </Tooltip>
                            </Grid>
                          ))}
                      </React.Fragment>
                    ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default memo(NodeSelector);
