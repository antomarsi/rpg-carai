import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { stringAvatar } from "../../utils/colors";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "./../../lib/firebase/context";
import UserAvatar from "../../components/UserAvatar";

const SelectCharacterForm: React.FC = () => {
  const { characters } = React.useContext(UserContext);
  const [SelectedCharacter, setSelectedCharacter] = React.useState<string>();

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader title="Selecione um personagem" avatar={<UserAvatar />} />
      <CardContent>
        <List sx={{ pt: 0 }}>
          {characters?.map((character) => (
            <ListItem
              button
              onClick={() => setSelectedCharacter(character.id)}
              key={character.id}
              selected={character.id === SelectedCharacter}
            >
              <ListItemAvatar>
                <Avatar
                  alt={character.name}
                  src={character.photoURL || undefined}
                  {...stringAvatar(character.name)}
                />
              </ListItemAvatar>
              <ListItemText primary={character.name} secondary={character.id} />
            </ListItem>
          ))}
          <ListItem
            button
            selected={SelectedCharacter === "new-character"}
            onClick={() => setSelectedCharacter("new-character")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Criar um novo personagem" />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          disabled={!SelectedCharacter}
          variant="contained"
          sx={{ ml: "auto" }}
        >
          Próximo
        </Button>
      </CardActions>
    </Card>
  );
};

export default SelectCharacterForm;
