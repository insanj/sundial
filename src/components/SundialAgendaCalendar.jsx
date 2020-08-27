import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1
    }
  },
  '@keyframes scaleUp': {
    '0%': {
      transform: 'scale(0.75, 0.75)',
    },
    '100%': {
      transform: 'scale(1, 1)',
    }
  },

  root: {
    zIndex: -1,
    background: '#424242',
    height: '60px',
    minWidth: '250px',
  },
  legendCell: {
    paddingTop: 5,
    paddingBottom: 4,
    fontSize: '0.8rem',
    fontFamily: 'Lato-Bold',
    fontWeight: 500,
    textAlign: 'center',
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',

    // borderLeft: '1px solid rgba(255,255,255,0.2)',
    // borderRight: '1px solid rgba(255,255,255,0.2)',

    '& > tbody > tr > td': {
      animation: '$fadeIn 2s ease-in forwards, $scaleUp 2s ease-out forwards'
    },

    '& > tbody > tr > td:nth-child(n+2)': {
      borderLeft: '1px solid rgba(0,0,0,0.2)',
    },

    '& > tbody > tr > td:nth-child(4)': {
      // background: 'rgba(94, 53, 177, 0.4)',
      color: 'rgba(220, 231, 117, 1.0)',
      fontWeight: 700,

      '& > *:not(:nth-child(1))': {
        background: theme.palette.secondary.main,
        color: '#414241'
      }
    },

    // '& > tbody > tr > td:nth-child(3), td:nth-child(5)': {
    //   background: 'rgba(94, 53, 177, 0.3)',
    // },

    // '& > tbody > tr > td:nth-child(2), td:nth-child(6)': {
    //   background: 'rgba(94, 53, 177, 0.2)',
    // },

    // '& > tbody > tr > td:nth-child(1), td:nth-child(7)': {
    //   background: 'rgba(94, 53, 177, 0.1)',
    // }
  },
  cell: {
    cursor: 'pointer',
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 8,
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 1.2,
    fontSize: '0.9rem',

    transition: '0.2s ease',
    '&:hover': {
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
  },
  cellText: {
    width: 26,
    height: 26,
    paddingTop: 4,
    borderRadius: 13,
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'rgba(255,255,255,0.1)'
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
    const dayText = moment(day).format('D');
    const fullDateText = moment(day).format('MMMM Do, YYYY');
    const headerText = moment(day).format('dd').charAt(0);
    return (
      <Tooltip arrow title={fullDateText}>
        <td className={classes.cell} onClick={ () => handleCellClick(day) }>
          <div className={classes.legendCell}>
            { headerText }
          </div>
          <div className={classes.cellText}>
            { dayText }
          </div>
        </td>
      </Tooltip>
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
