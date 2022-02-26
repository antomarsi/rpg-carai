import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

// import { Container } from './styles';
import { PlayerContext } from './../../hooks/PlayerState';

const HomePage: React.FC = () => {
  const {character, player} = React.useContext(PlayerContext)

  return <Box>

    <Typography>
      Player: {player.name} [{player.id}]
    </Typography>
    <Typography>
      Character: {character.name} [{character.id}]
    </Typography>
    <Typography>
      Forca: {character.strength}
    </Typography>
    <Typography>
      Inteligência: {character.intelligence}
    </Typography>
    <Typography>
      key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY}
    </Typography>
  </Box>;
};

export default HomePage;
