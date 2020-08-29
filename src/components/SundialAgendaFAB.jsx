import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

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
      color: '#424242',
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
