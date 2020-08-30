import React, { useEffect, useCallback } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import jquery from 'jquery';

import SundialAgendaAppBar from '../components/SundialAgendaAppBar';
import SundialAgendaCalendar from '../components/SundialAgendaCalendar';
import SundialAgendaTodoList from '../components/SundialAgendaTodoList';
import SundialAgendaFAB from '../components/SundialAgendaFAB';
import SundialNewTodoDialog from '../components/SundialNewTodoDialog';
import SundialEditTodoDialog from '../components/SundialEditTodoDialog';

import Snackbar from '@material-ui/core/Snackbar';

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

  '@keyframes backgroundFade': {
    '0%': {
      backgroundPosition: '100% 50%'
    },
    '50%': {
      backgroundPosition: '0% 50%'
    },
    '100%': {
      backgroundPosition: '100% 50%'
    }
  },

  root: {
    minWidth: '270px',

    background: theme.palette.primary.main,
    background: 'linear-gradient(-45deg, rgba(131,73,247,1) 0%, rgba(125,71,231,1) 5%, rgba(116,71,203,1) 11%, rgba(114,70,201,1) 23%, rgba(98,57,177,1) 42%, rgba(94,56,170,1) 48%, rgba(94,53,177,1) 52%, rgba(90,61,186,1) 66%, rgba(94,83,187,1) 83%, rgba(98,102,199,1) 100%)',

    backgroundSize: '800% 800%',
    animation: '$backgroundFade 30s ease infinite alternate',
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
    animation: '$moveUp 2s ease-out forwards',
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
  const [selectedSort, setSelectedSort] = React.useState(1);

  const [loadedTodoListItemDate, setLoadedTodoListItemDate] = React.useState(null);
  const [loadedTodoListItems, setLoadedTodoListItems] = React.useState(null);

  const [isNewTodoDialogOpen, setIsNewTodoDialogOpen] = React.useState(false);
  const [isNewTodoSaveInProgress, setIsNewTodoSaveInProgress] = React.useState(false);

  const [newTodoDialogTextAreaValue, setNewTodoDialogTextAreaValue] = React.useState('');

  const [newTodoSnackbarOpen, setNewTodoSnackbarOpen] = React.useState(false);

  const [isEditTodoDialogOpen, setIsEditTodoDialogOpen] = React.useState(false);
  const [editTodoDialogItem, setEditTodoDialogItem] = React.useState(null);
  const [isEditTodoSaveInProgress, setIsEditTodoSaveInProgress] = React.useState(false);
  const [editTodoDialogTextAreaValue, setEditTodoDialogTextAreaValue] = React.useState('');

  const load = useCallback(() => {
    networker.getItems({ token: token }).then(r => {
      setLoadedTodoListItems(r.data);
    }).catch(e => {
      console.log(e);
    });
  }, [setLoadedTodoListItems, networker, token]);

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

    let sorted = [];
    if (selectedSort === 1) { // checked
      sorted = filtered.sort((s1, s2) => {
        const c1 = s1.metadata !== null && s1.metadata.checked !== null && s1.metadata.checked === 'true';
        const c2 = s2.metadata !== null && s2.metadata.checked !== null  && s2.metadata.checked === 'true';
        if (c1 === c2) {
          return s1.name.localeCompare(s2.name); // fallback to alphabetical
        } else if (c1 === true && c2 === false) {
          return 1;
        } else if (c1 === false && c2 === true) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (selectedSort === 2) { // last edited
      sorted = filtered.sort((s1, s2) => {
        return moment(s2.modified).diff(moment(s1.modified));
      });
    } else {
      sorted = filtered.sort((s1, s2) => { // alphabetical
        return s1.name.localeCompare(s2.name);
      });
    }

    if (!searchInput || searchInput.length < 1) {
      return sorted;
    }

    const searchWords = searchInput.toLowerCase().split(" ");
    const searched = sorted.filter(i => {
      const words = i.name.toLowerCase();
      const wordsMatched = searchWords.filter(w => {
        return words.includes(w);
      });

      return wordsMatched.length > 0;
    });

    return searched;
  }

  const getDatesToUnreadItemsForSelectedDate = () => {
    if (!loadedTodoListItems || loadedTodoListItems.length < 1) {
      return loadedTodoListItems;
    }

    let datesToUnread = {};
    let dateFormat = 'YYYY-MM-DD';

    for (let item of loadedTodoListItems) {
      const dateMoment = moment(item.date);
      const dateKey = dateMoment.format(dateFormat);
      
      let isUnread = !item.metadata || !item.metadata.checked || item.metadata.checked !== "true";

      if (isUnread !== true) {
        continue;
      } 

      let existing = datesToUnread[dateKey];
      if (existing) {
        existing.push(item);
        datesToUnread[dateKey] = existing;
      } else {
        let array = [item];
        datesToUnread[dateKey] = array;
      }
    }

    return datesToUnread;
  }

  const handleTodoListSortClick = (sortIndex) => {
    setSelectedSort(sortIndex);
  }

  const handleSearchInputChange = (newSearchInput) => {
    setSearchInput(newSearchInput);
  }

  const handleCalendarDateClick = (newSelectedDate) => {
    const mapRangeToRange =  (x, in_min, in_max, out_min, out_max) => {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    jquery('.SundialAgendaCalendar').animate({
      opacity: 0.8
    }, {
      duration: 400,
      easing: 'swing',
      step: (now, tween) => {
        const boundedNow = Math.min(Math.max(now, 0.8), 1.0);
        const transformVal = 400 - mapRangeToRange(boundedNow, 0.8, 1.0, 0.0, 400.0);
        const transformCSSVal = `translate(0px, -${transformVal}px)`;
        jquery('.SundialAgendaCalendar').css('transform', transformCSSVal);
      },
      always: () => {
        setSelectedDate(newSelectedDate);

        jquery('.SundialAgendaCalendar').animate({
          opacity: 1.0
        }, {
          duration: 400,
          easing: 'swing',
          step: (now, tween) => {
            const boundedNow = Math.min(Math.max(now, 0.8), 1.0);
            const transformVal = 400 - mapRangeToRange(boundedNow, 0.8, 1.0, 0.0, 400.0);
            const transformCSSVal = `translate(0px, -${transformVal}px)`;
            jquery('.SundialAgendaCalendar').css('transform', transformCSSVal);
          },
        });
      }
    });
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

  const handleAppBarLogoClick = () => {
    const confirm = window.confirm("Thanks for coming! Would you like to sign out of Sundial?");
    if (!confirm) {
      return;
    }

    if (window.gapi) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        window.location.href = '/';
      });
    }
  }

  const handleFloatingActionButtonClick = () => {
    setIsNewTodoDialogOpen(true);
  }

  const handleNewTodoDialogTextAreaInputChange = (event) => {
    setNewTodoDialogTextAreaValue(event.target.value);
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

  const handleAppBarCalendarDateSelected = (newDate) => {
    setSelectedDate(newDate);
    load();
  }

  const handleTodoListItemClick = (todoListItem) => {
    setEditTodoDialogItem(todoListItem);
    setEditTodoDialogTextAreaValue(todoListItem.name);
    setIsEditTodoDialogOpen(true);
  }

  const handleEditTodoDialogTextAreaInputChange = (event) => {
    setEditTodoDialogTextAreaValue(event.target.value);
  }

  const handleEditTodoDialogCloseClick = () => {
    setIsEditTodoDialogOpen(false, () => {
      setEditTodoDialogItem(null);
      setEditTodoDialogTextAreaValue('');
    });
  }

  const handleEditTodoDialogSaveClick = (todoListItem) => {
    setIsEditTodoSaveInProgress(true);

    networker.editItem({
      token: token,
      id: todoListItem.id,
      name: todoListItem.name,
      date: todoListItem.date,
      metadata: todoListItem.metadata && Object.keys(todoListItem.metadata).length > 0 ? todoListItem.metadata : { checked: false }
    }).then(r => {
      setIsEditTodoSaveInProgress(false);
      setIsEditTodoDialogOpen(false);
      setEditTodoDialogTextAreaValue(todoListItem.name);

      load();
    }).catch(e => {
      setIsEditTodoSaveInProgress(false);

      load();
      console.log(e);
    });
  }

  const handleEditTodoDialogDeleteClick = (todoListItem) => {
    const confirm = window.confirm("Are you sure you want to delete this Todo? You cannot undo this action!");
    if (!confirm) {
      return;
    }

    setIsEditTodoSaveInProgress(true);

    networker.deleteItem({
      token: token,
      id: todoListItem.id,
    }).then(r => {
      setIsEditTodoSaveInProgress(false);
      setIsEditTodoDialogOpen(false);
      setEditTodoDialogTextAreaValue(todoListItem.name);

      load();
    }).catch(e => {
      setIsEditTodoSaveInProgress(false);

      load();
      console.log(e);
    });
  }

  return (
    <div className={ classes.root }>
      <SundialAgendaAppBar
        searchPlaceholder={ `Search ${moment(selectedDate).format('M/D/YY')}...` }
        onLogoClick={ handleAppBarLogoClick }
        onSearchInputChange={ handleSearchInputChange }
        selectedDate={ selectedDate }
        onCalendarDateSelected={ handleAppBarCalendarDateSelected }
      />

      <div className={classes.calendar}>
        <SundialAgendaCalendar 
          selectedDate={ selectedDate }
          datesToUnreadItems={ getDatesToUnreadItemsForSelectedDate() }
          onDateClick={ handleCalendarDateClick }
        />
      </div>

      <div className={classes.calendarPadding} />

      <div className={classes.todoList}>
        <SundialAgendaTodoList
          selectedDate={ selectedDate }
          items={ getTodoListItemsForSelectedDate() }
          selectedSort={ selectedSort }
          onTodoListSortClick={ handleTodoListSortClick }
          onItemClick={ handleTodoListItemClick }
          onItemEditSubmit={ handleTodoListItemEditSubmit }
          onItemDeleteClick={ handleEditTodoDialogDeleteClick }
          forceAnimationsOff={ isEditTodoDialogOpen || isNewTodoDialogOpen }
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

      <SundialEditTodoDialog
        open={ isEditTodoDialogOpen }
        item={ editTodoDialogItem }
        textAreaValue={ editTodoDialogTextAreaValue }
        onTextAreaInputChange={ handleEditTodoDialogTextAreaInputChange }
        onCloseClick={ handleEditTodoDialogCloseClick }
        onSaveClick={ handleEditTodoDialogSaveClick }
        onDeleteClick={ handleEditTodoDialogDeleteClick }
        isLoadingState={ isEditTodoSaveInProgress }
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
