import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  '@keyframes moveFromRight': {
    '0%': {
      transform: 'translate(500px, 0)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    }
  },

  root: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    
    animation: '$moveFromRight 1.5s ease-in-out forwards',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function SundialAgendaFAB({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="secondary" aria-label="edit" onClick={ onClick }>
        <EditIcon />
      </Fab>
    </div>
  );
}
