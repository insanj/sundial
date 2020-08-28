import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    fontFamily: 'Lato-Bold'
  },
  headerSubtitle: {
    fontFamily: 'Lato-Black',
    opacity: 0.4,
    lineHeight: 1,
    margin: 0,
    padding: 0,
    fontSize: '0.7rem',
    fontWeight: 800,
  },
  textArea: {
    background: 'none',
    color: theme.palette.primary.contrastText,

    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 8,
    
    resize: 'none',

    fontFamily: 'Lato-Bold',
    fontSize: '1.2rem',
    fontWeight: 400,

    padding: 5,
    width: '100%',
  },
  textAreaContainer: {
    margin: 10
  },
  progress: {
  }
}));

export default function SundialNewTodoDialog({ open, selectedDate, onSaveClick, onCloseClick, isLoadingState, textAreaValue, onTextAreaInputChange }) {
  const classes = useStyles();

  const handleCloseClick = () => {
    onCloseClick();
  }

  const handleSaveClick = () => {
    if (!textAreaValue || textAreaValue.trim().length < 1) {
      alert("You cannot save an empty Todo! Type something in and try again.");
      return;
    }

    onSaveClick(textAreaValue);
  }
  
  const daySubtitle = moment(selectedDate).format('DD MMMM yyyy').toUpperCase(); // 15 AUGUST 2020

  return (
    <div className={ classes.root }>
      <Dialog open={ open } onClose={ handleCloseClick } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <div className={ classes.header }>
            New Todo
          </div>
          <div className={ classes.headerSubtitle }>
            { daySubtitle }
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={ classes.textAreaContainer }>
            <TextareaAutosize
              className={ classes.textArea }
              rowsMax={15}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              color="secondary"
              fullWidth
              value={textAreaValue}
              onChange={onTextAreaInputChange}
              disabled={isLoadingState === true}
              style={{
                opacity: isLoadingState === true ? 0.5 : 1.0
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleCloseClick } color="secondary">
            Cancel
          </Button>
          <Button 
            disabled={isLoadingState === true}
            onClick={ handleSaveClick } 
            color="secondary" 
            variant="contained"
          >
            { isLoadingState !== true ? 'Save' : (
              <CircularProgress color="secondary" size={24}/>
            ) }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
