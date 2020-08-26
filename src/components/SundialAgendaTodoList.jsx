import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import emptyState from '../img/empty_state.png';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  root: {

    '& > *': {
      transform: 'rotate(180deg)'
    },

    '& > * > *': {
      transform: 'rotate(180deg)'
    }
  },
  paper: {
  },
  content: {
    overflow: 'hidden',
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)'
  },

}));


function SundialAgendaTodoListEmpty() {
  const classes = makeStyles((theme) => ({
    root: {
      padding: '50px',
      textAlign: 'center',

      maxWidth: '400px',
      height: 'auto',

      marginRight: 'auto',
      marginLeft: 'auto',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 'auto',
      objectFit: 'contain'
    },
    title: {
      fontWeight: 800,
      fontSize: '1.3rem',
      letterSpacing: 0.2,
      opacity: 0.8
    },
    body: {
      fontWeight: 500,
      fontSize: '0.9rem',
      opacity: 0.7
    },
    brand: {
      color: theme.palette.secondary.main
    },
    add: {
      display: 'inline-block',
      verticalAlign: 'middle',

      background: 'white',
      color: 'rgba(0,0,0,0.8)',

      padding: 6,
      borderRadius: 19,

      width: 38,
      height: 38,

      transform: 'scale(0.7,0.7)'
    }

  }))();

  return (
    <div className={classes.root}>
      <img src={ emptyState } className={ classes.image } />


      <div className={ classes.title }>
        Ready to fill in your day?
      </div>

      <div className={ classes.body }>
        <span className={classes.brand}>Sundial</span> is too. Tap <div className={classes.add}><CreateIcon /></div> to create a new todo.
      </div>
    </div>
  );
}

export default function SundialAgendaTodoList({}) {
  const classes = useStyles();
  
  return (
    <div className={ classes.root }>
      <Paper elevation={4} square className={ classes.paper }>
        <div className={ classes.content }>
          <SundialAgendaTodoListEmpty />
        </div>
      </Paper>
    </div>
  );
}
