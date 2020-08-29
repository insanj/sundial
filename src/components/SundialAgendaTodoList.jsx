import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SundialAgendaTodoListCell from './SundialAgendaTodoListCell';
import SundialAgendaTodoListEmpty from './SundialAgendaTodoListEmpty';
import SundialAgendaTodoListHeader from './SundialAgendaTodoListHeader';

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
          <div>
            <SundialAgendaTodoListCell
              item={ i }
              onClick={ onItemClick }
              checked={ i.metadata && i.metadata.checked ? i.metadata.checked === "true" : false }
              onCheckboxClick={ handleCheckboxClick }
            />
          </div>
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
