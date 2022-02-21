import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NodeEngine from "@/components/NodeEngine/index";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "800px",
          height: "800px",
        }}
      >
        <NodeEngine />
      </Box>
    </Container>
  );
};

export default Home;
