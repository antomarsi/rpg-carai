import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import Character from '../../models/Character';

export interface SimpleDialogProps {
  open: boolean;
  characters: Character[]
  onClose: (value: string) => void;
}

const SelectCharacterDialog: React.FC<SimpleDialogProps> = ({ onClose, open, characters }) => {

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogTitle>Select your Character</DialogTitle>
      <List sx={{ pt: 0 }}>
        {characters.map((character) => (
          <ListItem button onClick={() => handleListItemClick(character.id)} key={character.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={character.name} secondary={character.id} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
export default SelectCharacterDialog