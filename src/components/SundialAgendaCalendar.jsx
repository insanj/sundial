import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: -1,
    background: '#424242',
    height: '60px',
    minWidth: '250px',
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',

    // borderLeft: '1px solid rgba(255,255,255,0.2)',
    // borderRight: '1px solid rgba(255,255,255,0.2)',

    '& > tbody > tr > td:nth-child(n+2)': {
      borderLeft: '1px solid rgba(0,0,0,0.2)',
    },

    '& > tbody > tr > td:nth-child(4)': {
      background: 'rgba(94, 53, 177, 0.4)',
      color: 'rgba(220, 231, 117, 1.0)',
      fontWeight: 700,
    },

    '& > tbody > tr > td:nth-child(3), td:nth-child(5)': {
      background: 'rgba(94, 53, 177, 0.3)',
    },

    '& > tbody > tr > td:nth-child(2), td:nth-child(6)': {
      background: 'rgba(94, 53, 177, 0.2)',
    },

    '& > tbody > tr > td:nth-child(1), td:nth-child(7)': {
      background: 'rgba(94, 53, 177, 0.1)',
    }
  },
  cell: {
    cursor: 'pointer',
    textAlign: 'center',
    padding: 14,
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 1.2,
    fontSize: '0.9rem',

    transition: '0.2s ease',
    '&:hover': {
      fontWeight: 900,
      background: 'rgba(94, 53, 177, 0.6) !important'
    },

    // [theme.breakpoints.down(550)]: {
    //   paddingLeft: 8,
    //   paddingRight: 8,
    // },

    // [theme.breakpoints.down(470)]: {
    //   paddingLeft: 5,
    //   paddingRight: 5,
    // },

    // [theme.breakpoints.down(365)]: {
    //   paddingLeft: 5,
    //   paddingRight: 5,
    // },

    // [theme.breakpoints.down(325)]: {
    //   padding: 5,
    // },
  }
}));

export default function SundialAgendaCalendar({ selectedDate, onDateClick }) {
  const classes = useStyles();
    
  const handleCellClick = (day) => {
    onDateClick(day);
  }

  const monthTitle = moment(selectedDate).format("MMMM");

  const generateDays = (count=6) => {
    if (count % 2 !== 0) {
      count = count - 1;
    }

    let dayArray = [];
    const currentDay = moment(selectedDate);

    // days before
    for (let i = count / 2; i > 0; i--) {
      const subtracted = currentDay.clone().subtract(i, 'days');
      dayArray.push(subtracted);
    }

    dayArray.push(currentDay);

    // days after
    for (let i = 1; i < (count / 2) + 1; i++) {
      const added = currentDay.clone().add(i, 'days');
      dayArray.push(added);
    }

    const dayDateArray = dayArray.map(m => m.toDate());
    return dayDateArray;
  }

  const days = generateDays();
  const dayCells = days.map(day => {
    const dayFirstLine = moment(day).format('ddd');
    const daySecondLine = moment(day).format('D');
    return (
      <td className={classes.cell} onClick={ () => handleCellClick(day) }>
        <div>
          <div>
            { dayFirstLine }
          </div>
          <div>
            { daySecondLine }
          </div>
        </div>
      </td>
    );
  });

  return (
    <div className={ classes.root }>
      <table className={ classes.table }>
        <tbody>
          <tr>
            { dayCells }
          </tr>
        </tbody>
      </table>
    </div>
  );
}
