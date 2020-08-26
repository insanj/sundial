import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAgendaAppBar from '../components/SundialAgendaAppBar';
import SundialAgendaCalendar from '../components/SundialAgendaCalendar';
import SundialAgendaTodoList from '../components/SundialAgendaTodoList';
import SundialAgendaFAB from '../components/SundialAgendaFAB';
import SundialFooter from '../components/SundialFooter';

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

  '@keyframes moveFromRight': {
    '0%': {
      transform: 'translate(500px, 0)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    }
  },

  root: {

    '& > * > * > * > *': {
      animation: '$fadeIn 1.5s ease-in, $moveUp 1.5s ease-out'
    }
  },

  fab: {
    animation: '$fadeIn 1.5s ease-in, $moveFromRight 1.5s ease-out'
  },

  footer: {
    marginTop: 5,
  }
}));

export default function SundialAgendaPage({ networker, token }) {
  const classes = useStyles();
  
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [loadedTodoListItems, setLoadedTodoListItems] = React.useState(null);

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

  const handleFloatingActionButtonClick = () => {
    alert("Make new item!");
  }

  const handleAppBarLogoClick = () => {
    const confirm = window.confirm("Thanks for coming! Would you like to sign out of Sundial?");
    if (!confirm) {
      return;
    }

    const event = new CustomEvent("SundialPleaseSignOut");
    window.dispatchEvent(event);
  }

  return (
    <div className={ classes.root }>
      <SundialAgendaAppBar 
        onLogoClick={ handleAppBarLogoClick }
        onSearchInputChange={ handleSearchInputChange }
      />

      <SundialAgendaCalendar 
        selectedDate={ selectedDate }
        onDateClick={ handleCalendarDateClick }
      />

      <SundialAgendaTodoList
        items={ loadedTodoListItems }
        onItemEditSubmit={ handleTodoListItemEditSubmit }
        onItemDeleteSubmit={ handleTodoListItemDeleteSubmit }
      />

      <div className={classes.fab}>
        <SundialAgendaFAB
          onClick={ handleFloatingActionButtonClick }
        />
      </div>

      <div className={classes.footer}>
        <SundialFooter />
      </div>
    </div>
  );
}
