import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { ipcRenderer } from "electron";
import Layout from "../components/Layout";
import Routes from "./routes"
import { PlayerContext } from "../hooks/PlayerState";
import SelectCharacterDialog from "../components/SelectCharacterDialog";

export default function App() {
  React.useEffect(() => {
    ipcRenderer.send("backend-ready");
  });
  const { player, character, setSelectedCharacter } = useContext(PlayerContext)

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <SelectCharacterDialog open={!character} characters={player.characters} onClose={setSelectedCharacter} />
      <Layout>
        {character &&
          <Routes />}
      </Layout>
    </Box>
  );
}
