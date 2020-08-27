import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAgendaAppBar from '../components/SundialAgendaAppBar';
import SundialAgendaCalendar from '../components/SundialAgendaCalendar';
import SundialAgendaTodoList from '../components/SundialAgendaTodoList';
import SundialAgendaFAB from '../components/SundialAgendaFAB';
import SundialFooter from '../components/SundialFooter';
import SundialNewTodoDialog from '../components/SundialNewTodoDialog';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1
    }
  },

  '@keyframes moveUp': {
    '0%': {
      transform: 'translate(0, 10px)',
    },
    '100%': {
      transform: 'translate(0, 0px)',
    }
  },

  root: {
    minWidth: '270px',
    
    '& > * > * > * > *': {
      animation: '$fadeIn 2s ease-in forwards, $moveUp 2s ease-out forwards'
    }
  },

  footer: {
    marginTop: 5,
  },

  calendar: {
    position: 'fixed',
  },

  calendarPadding: {
    height: '60px',
  },
}));

export default function SundialAgendaPage({ networker, token }) {
  const classes = useStyles();
  
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [loadedTodoListItems, setLoadedTodoListItems] = React.useState(null);

  const [isNewTodoDialogOpen, setIsNewTodoDialogOpen] = React.useState(false);
  const [isNewTodoSaveInProgress, setIsNewTodoSaveInProgress] = React.useState(false);

  const handleSearchInputChange = (newSearchInput) => {
    setSearchInput(newSearchInput);
  }

  const handleCalendarDateClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  }

  const handleTodoListItemEditSubmit = (todoListItem) => {
    alert("Edit item!");
  }

  const handleTodoListItemDeleteSubmit = (todoListItem) => {
    alert("Delete item!");
  }

  const handleAppBarLogoClick = () => {
    const confirm = window.confirm("Thanks for coming! Would you like to sign out of Sundial?");
    if (!confirm) {
      return;
    }

    const event = new CustomEvent("SundialPleaseSignOut");
    window.dispatchEvent(event);
  }

  const handleFloatingActionButtonClick = () => {
    setIsNewTodoDialogOpen(true);
  }

  const handleNewTodoDialogCloseClick = () => {
    setIsNewTodoDialogOpen(false);
  }

  const handleNewTodoDialogSaveClick = (textAreaValue) => {
    setIsNewTodoSaveInProgress(true);
  }

  return (
    <div className={ classes.root }>
      <SundialAgendaAppBar 
        onLogoClick={ handleAppBarLogoClick }
        onSearchInputChange={ handleSearchInputChange }
      />

      <div className={classes.calendar}>
        <SundialAgendaCalendar 
          selectedDate={ selectedDate }
          onDateClick={ handleCalendarDateClick }
        />
      </div>

      <div className={classes.calendarPadding} />

      <SundialAgendaTodoList
        selectedDate={ selectedDate }
        items={ loadedTodoListItems }
        onItemEditSubmit={ handleTodoListItemEditSubmit }
        onItemDeleteSubmit={ handleTodoListItemDeleteSubmit }
      />

      <SundialAgendaFAB
        onClick={ handleFloatingActionButtonClick }
      />

      <SundialNewTodoDialog
        open={ isNewTodoDialogOpen }
        selectedDate={ selectedDate }
        onCloseClick={ handleNewTodoDialogCloseClick }
        onSaveClick={ handleNewTodoDialogSaveClick }
        isLoadingState={ isNewTodoSaveInProgress }
      />
    </div>
  );
}
