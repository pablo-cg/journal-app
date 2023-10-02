import TurnedInNot from '@mui/icons-material/TurnedInNot';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SidebarItem = ({ note }) => {
  const dispatch = useDispatch();

  const shortTitle = useMemo(() => {
    return note.title.length > 17
      ? `${note.title.substring(0, 17)}...`
      : note.title;
  }, [note.title]);

  function handleItemClick() {
    dispatch(setActiveNote({ ...note }));
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleItemClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={shortTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
