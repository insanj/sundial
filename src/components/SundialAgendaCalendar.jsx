import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: -1,
    background: '#424242',
    height: '60px',
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',

    // borderLeft: '1px solid rgba(255,255,255,0.2)',
    // borderRight: '1px solid rgba(255,255,255,0.2)',

    '& > tbody > tr > td:nth-child(n+2)': {
      borderLeft: '1px solid rgba(0,0,0,0.2)',
    }
  },
  cell: {
    textAlign: 'center',
    padding: 14,
    lineHeight: 1.2,

    [theme.breakpoints.down(440)]: {
      paddingLeft: 8,
      paddingRight: 8,
    },

    [theme.breakpoints.down(390)]: {
      paddingLeft: 8,
      paddingRight: 8,
    },

    [theme.breakpoints.down(365)]: {
      paddingLeft: 5,
      paddingRight: 5,
    },

    [theme.breakpoints.down(325)]: {
      padding: 5,
    },
  }
}));

export default function ReactComponent({}) {
  const classes = useStyles();
    
  const generateDays = (count=6) => {
    if (count % 2 !== 0) {
      count = count - 1;
    }

    let dayArray = [];
    const currentDay = moment();

    // days before
    for (let i = count / 2; i > 0; i--) {
      const subtracted = currentDay.clone().subtract(i, 'days');
      dayArray.push(subtracted);
    }

    dayArray.push(currentDay);

    // days after
    for (let i = 1; i < count / 2; i++) {
      const added = currentDay.clone().add(i, 'days');
      dayArray.push(added);
    }

    const dayDateArray = dayArray.map(m => m.toDate());
    return dayDateArray;
  }

  const days = generateDays();
  const dayCells = days.map(day => {
    const dayFirstLine = moment(day).format('ddd');
    const daySecondLine = moment(day).format('MMM D');
    return (
      <td className={classes.cell}>
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
