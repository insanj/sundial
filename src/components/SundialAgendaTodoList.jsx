import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';

import emptyState from '../img/empty_state.png';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';

import SundialAgendaTodoListCell from './SundialAgendaTodoListCell';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '320px',

    '& > *': {
      transform: 'rotate(180deg)'
    },

    '& > * > *': {
      transform: 'rotate(180deg)'
    }
  },
  paper: {
    background: ''
  },
  content: {
    overflow: 'hidden',
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
  },
  todoListSection: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    textAlign: 'left',

    '& > *': {
      margin: 6,
    }
  }
}));

function SundialAgendaTodoListEmpty() {
  const classes = makeStyles((theme) => ({
    root: {
      padding: '50px',
      paddingTop: '18px',
      textAlign: 'center',

      maxWidth: '450px',
      height: 'auto',

      marginRight: 'auto',
      marginLeft: 'auto',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 'auto',
      objectFit: 'contain',
    },
    title: {
      fontFamily: 'Lato-Bold',
      fontWeight: 800,
      fontSize: '1.5rem',
      letterSpacing: 0.,
      opacity: 0.8,
      lineHeight: 1.1,
    },
    body: {
      fontWeight: 500,
      fontSize: '1.1rem',
      opacity: 0.7,

      [theme.breakpoints.down(415)]: {
        paddingTop: 8,
      },
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
    },
    callToAction: {
      display: 'inline',

      [theme.breakpoints.down(415)]: {
        display: 'inline-block',
      },
    }

  }))();

  return (
    <div className={classes.root}>
      <img src={ emptyState } className={ classes.image } />


      <div className={ classes.title }>
        Ready to fill in your day?
      </div>

      <div className={ classes.body }>
        <span className={classes.brand}>Sundial</span> is too. <div className={classes.callToAction}>Tap <div className={classes.add}><CreateIcon /></div> to create a todo.</div>
      </div>
    </div>
  );
}

function SundialAgendaTodoListHeader({ date, itemCount }) {
  const classes = makeStyles((theme) => ({
    header: {
      textAlign: 'left',
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight: 1,
      fontSize: '3.0rem',

    },
    top: {
      // float: 'right',
      // display: 'inline',
      color: 'rgba(255,255,255,0.4)',
      fontWeight: 800,
      fontSize: '0.8rem',

      '& > span:nth-child(1)': {
      }
    },
    bottom: {
      fontFamily: 'Lato-Bold',
    },
    bull: {
      paddingLeft: 3,
      paddingRight: 3
    }

  }))();

  const day = moment(date).format("dddd");
  const month = moment(date).format("MMM").toUpperCase();
  const year = moment(date).format("yyyy");

  return (
    <div className={classes.header}>

      <div className={classes.top}>
        <span>{ month }</span> <span>{ year }</span> <span className={classes.bull}>&bull;</span> <span>{ itemCount }</span> <span>TODO{ itemCount === 1 ? '' : 'S'}</span>
      </div>

      <div className={classes.bottom}>
        <span>{ day }</span>
      </div>

    </div>
  );
}

export default function SundialAgendaTodoList({ selectedDate, items, onItemEditSubmit, onItemClick }) {
  const classes = useStyles();

  const handleCheckboxClick = (item, checked) => {
    if (!item.metadata) {
      item.metadata = { checked: checked };
    } else {
      item.metadata.checked = checked;
    }

    onItemEditSubmit(item);
  }
  
  const todoListContent = !items || items.length < 1 ? (
    <SundialAgendaTodoListEmpty />
  ) : (
    <div className={classes.todoListSection}>
      { items.map(i => {
        return (
          <SundialAgendaTodoListCell
            item={ i }
            onClick={ onItemClick }
            checked={ i.metadata && i.metadata.checked ? i.metadata.checked === "true" : false }
            onCheckboxClick={ handleCheckboxClick }
          />
        );
      }) }
    </div>
  );

  return (
    <div className={ classes.root }>
      <Paper elevation={4} square className={ classes.paper }>
        <div className={ classes.content }>
          <SundialAgendaTodoListHeader
            date={ selectedDate }
            itemCount={ items ? items.length : 0 }
          />

          { todoListContent }
        </div>
      </Paper>
    </div>
  );
}
