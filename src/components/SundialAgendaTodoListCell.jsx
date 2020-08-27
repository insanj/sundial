import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import Tilt from 'react-tilt'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
  },
  content: {
    paddingLeft: 0,
    paddingRight: 10,
  },
  title: {
    display: 'inline-block'
  }
}));

export default function SundialAgendaTodoListCell({ item, checked, onCheckboxClick, onClick }) {
  const classes = useStyles();
  
  const handleClick = () => {
    onClick(item);
    // onCheckboxClick(item, !checked);
  }

  const handleCheckboxClick = (event) => {
    onCheckboxClick(item, event.target.checked);
  }

  return (      
    <div className={ classes.root }>
      <Tilt className="Tilt" options={{ perspective: 900, scale: 1.1 }}>
        <Paper className={ classes.paper }>
          <div className="Tilt-inner">
            <div className={ classes.content }>
              <Checkbox
                checked={ checked }
                onChange={ handleCheckboxClick }
              />

              <div className={classes.title} onClick={ handleClick }>
                { item.name }
              </div>
            </div>
          </div>
        </Paper>
      </Tilt>
    </div>
  );
}
