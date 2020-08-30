import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'inline-block',
  },
  paper: {
  },
  content: {
    paddingLeft: 14,
    paddingRight: 10,
    verticalAlign: 'middle',
  },
  checkbox: {
    marginLeft: -10,
    marginTop: 2,
    display: 'inline-block',
    verticalAlign: 'top'
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'top',

    fontSize: '1.8rem',

    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 4,
    overflowWrap: 'break-word'
  },
  itemName: {
  }
}));

export default function SundialAgendaTodoListCell({ item, checked, onCheckboxClick, onClick, onDeleteClick }) {
  const classes = useStyles();

  const [contextMenuOpenAnchor, setContextMenuOpenAnchor] = React.useState(null);
  
  const handleClick = (event) => {
    if (event.target.type === 'checkbox') {
      return;
    }

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
      <Paper className={ classes.paper } elevation={3}>
        <div className="Tilt-inner">
          <div className={ classes.content } onClick={ handleClick } onContextMenu={ handleContextMenuClick }>
            <div className={classes.title}>
              <Checkbox
                className={classes.checkbox}
                checked={ checked }
                onChange={ handleCheckboxClick }
              />

              <span>
                { item.name }
              </span>
            </div>
          </div>
        </div>
      </Paper>

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
