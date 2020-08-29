import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Tilt from 'react-tilt'

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',

  },
  content: {
    paddingLeft: 0,
    paddingRight: 10,
    verticalAlign: 'middle',
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle',

    fontSize: '1.8rem',

    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 4,
  }
}));

export default function SundialAgendaTodoListCell({ item, checked, onCheckboxClick, onClick, onDeleteClick }) {
  const classes = useStyles();

  const [contextMenuOpenAnchor, setContextMenuOpenAnchor] = React.useState(null);
  
  const handleClick = () => {
    onClick(item);
    // onCheckboxClick(item, !checked);
  }

  const handleCheckboxClick = (event) => {
    onCheckboxClick(item, event.target.checked);
  }

  const handleContextMenuClick = (event) => {
    event.preventDefault();
    setContextMenuOpenAnchor(event.currentTarget);
  }

  const handleContextMenuClose = () => {
    setContextMenuOpenAnchor(null);
  }

  const handleContextMenuDeleteClick = () => {
    onDeleteClick(item);
    setContextMenuOpenAnchor(null);
  }

  return (      
    <div className={ classes.root }>
      <Tilt className="Tilt" options={{ perspective: 900, scale: 1.1 }}>
        <Paper className={ classes.paper }>
          <div className="Tilt-inner">
            <div className={ classes.content } onContextMenu={ handleContextMenuClick }>
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

      <Menu 
        open={ Boolean(contextMenuOpenAnchor) }
        anchorEl={contextMenuOpenAnchor}
        onClose={ handleContextMenuClose }
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >

        <MenuItem onClick={ handleContextMenuDeleteClick }><DeleteIcon />&nbsp;&nbsp;Delete</MenuItem>

      </Menu>
    </div>
  );
}
