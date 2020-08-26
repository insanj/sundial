import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAgendaAppBar from '../components/SundialAgendaAppBar';
import SundialAgendaCalendar from '../components/SundialAgendaCalendar';
import SundialAgendaTodoList from '../components/SundialAgendaTodoList';
import SundialAgendaFAB from '../components/SundialAgendaFAB';
import SundialFooter from '../components/SundialFooter';

const useStyles = makeStyles((theme) => ({
  root: {
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

  return (
    <div className={ classes.root }>
      <SundialAgendaAppBar 
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

      <SundialAgendaFAB
        onClick={ handleFloatingActionButtonClick }
      />

      <div className={classes.footer}>
        <SundialFooter />
      </div>
    </div>
  );
}
