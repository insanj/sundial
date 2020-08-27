import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import SundialAgendaAppBar from '../components/SundialAgendaAppBar';
import SundialAgendaCalendar from '../components/SundialAgendaCalendar';
import SundialAgendaTodoList from '../components/SundialAgendaTodoList';
import SundialAgendaFAB from '../components/SundialAgendaFAB';
import SundialFooter from '../components/SundialFooter';
import SundialNewTodoDialog from '../components/SundialNewTodoDialog';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import moment from 'moment';

const bannerTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    fontFamily: 'Lato'
  }
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

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

  todoList: {
    animation: '$fadeIn 2s ease-in forwards, $moveUp 2s ease-out forwards',
  },

  snackbar: {
    cursor: 'pointer',
    bottom: 30,
    left: 30,

    [theme.breakpoints.down(320)]: {
      bottom: 90,
    },
  }
}));

export default function SundialAgendaPage({ networker, token }) {
  const classes = useStyles();

  const [searchInput, setSearchInput] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [loadedTodoListItemDate, setLoadedTodoListItemDate] = React.useState(null);
  const [loadedTodoListItems, setLoadedTodoListItems] = React.useState(null);

  const [isNewTodoDialogOpen, setIsNewTodoDialogOpen] = React.useState(false);
  const [isNewTodoSaveInProgress, setIsNewTodoSaveInProgress] = React.useState(false);

  const [newTodoDialogTextAreaValue, setNewTodoDialogTextAreaValue] = React.useState('');

  const [newTodoSnackbarOpen, setNewTodoSnackbarOpen] = React.useState(false);


  const load = () => {
    networker.getItems({ token: token }).then(r => {
      setLoadedTodoListItems(r.data);
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    if (loadedTodoListItemDate) {
      return;
    }

    setLoadedTodoListItemDate(selectedDate);
    load();
  }, [loadedTodoListItemDate, setLoadedTodoListItemDate, selectedDate, load])

  const getTodoListItemsForSelectedDate = () => {
    if (!loadedTodoListItems || loadedTodoListItems.length < 1) {
      return loadedTodoListItems;
    }

    const selectedMoment = moment(selectedDate);
    const filtered = loadedTodoListItems.filter(i => {
      const dateMoment = moment(i.date);
      return dateMoment.day() === selectedMoment.day() && dateMoment.month() === selectedMoment.month() && dateMoment.year() === selectedMoment.year();
    });

    if (!searchInput || searchInput.length < 1) {
      return filtered;
    }

    const searchWords = searchInput.toLowerCase().split(" ");
    const searched = filtered.filter(i => {
      const words = i.name.toLowerCase();
      const wordsMatched = searchWords.filter(w => {
        return words.includes(w);
      });

      return wordsMatched.length > 0;
    });

    return searched;
  }

  const handleSearchInputChange = (newSearchInput) => {
    setSearchInput(newSearchInput);
  }

  const handleCalendarDateClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  }

  const handleTodoListItemEditSubmit = (todoListItem) => {
    networker.editItem({
      token: token,
      id: todoListItem.id,
      name: todoListItem.name,
      date: todoListItem.date,
      metadata: todoListItem.metadata
    }).then(r => {
      load();
    }).catch(e => {
      console.log(e);
    });
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

  const handleNewTodoDialogTextAreaInputChange = (event) => {    setNewTodoDialogTextAreaValue(event.target.value);
  }

  const handleNewTodoDialogCloseClick = () => {
    setIsNewTodoDialogOpen(false);
  }

  const handleNewTodoDialogSaveClick = () => {
    setIsNewTodoSaveInProgress(true);

    networker.newItem({
      token: token,
      name: newTodoDialogTextAreaValue,
      date: selectedDate,
      metadata: {}
    }).then(r => {
      load();

      setNewTodoSnackbarOpen(true);
      setIsNewTodoSaveInProgress(false);
      setIsNewTodoDialogOpen(false);
      setNewTodoDialogTextAreaValue('');
    }).catch(e => {
      alert("Uh oh... We weren't able to save that Todo. Try again?");
      console.log(e);
      setIsNewTodoSaveInProgress(false);
    });
  }

  return (
    <div className={ classes.root }>
      <SundialAgendaAppBar
        searchPlaceholder={ `Search ${moment(selectedDate).format('M/D/YY')}...` }
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

      <div className={classes.todoList}>
        <SundialAgendaTodoList
          selectedDate={ selectedDate }
          items={ getTodoListItemsForSelectedDate() }
          onItemEditSubmit={ handleTodoListItemEditSubmit }
          onItemDeleteSubmit={ handleTodoListItemDeleteSubmit }
        />
      </div>

      <SundialAgendaFAB
        onClick={ handleFloatingActionButtonClick }
      />

      <SundialNewTodoDialog
        open={ isNewTodoDialogOpen }
        textAreaValue={ newTodoDialogTextAreaValue }
        onTextAreaInputChange={ handleNewTodoDialogTextAreaInputChange }
        selectedDate={ selectedDate }
        onCloseClick={ handleNewTodoDialogCloseClick }
        onSaveClick={ handleNewTodoDialogSaveClick }
        isLoadingState={ isNewTodoSaveInProgress }
      />

      <ThemeProvider theme={bannerTheme}>
        <Snackbar
          className={classes.snackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ newTodoSnackbarOpen }
          autoHideDuration={ 3400 }
          onClose={ () => setNewTodoSnackbarOpen(false) }
          onClick={ () => setNewTodoSnackbarOpen(false) }
          TransitionComponent={SlideTransition}
        >
          <div>
            <Alert variant="filled" severity="success">
              New Todo Added!
            </Alert>
          </div>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}
