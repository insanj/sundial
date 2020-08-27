import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

export default function SundialAgendaTodoListHeader({ date, itemCount }) {
  const classes = makeStyles((theme) => ({
    '@keyframes underlineStroke': {
      '0%': {
        left: '20px',
        width: 0,
      },
      '50%': {
        left: '20px',
        width: '240px',
      },
      '100%': {
        left: '260px',
        width: 0,
      }
    },

    underline: {
      position: 'absolute',
      background: theme.palette.secondary.main,
      height: '2px',
      width: '240px',

      animation: '$underlineStroke 1s forwards ease-in-out'
    },

    header: {
      textAlign: 'left',
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight: 1,
      fontSize: '3.0rem',

    },
    top: {
      // float: 'right',
      // display: 'inline',
      color: 'rgba(255,255,255,0.4)',
      fontWeight: 800,
      fontSize: '0.8rem',

      '& > span:nth-child(1)': {
      }
    },
    bottom: {
      fontFamily: 'Lato-Bold',
    },
    bull: {
      paddingLeft: 3,
      paddingRight: 3
    }

  }))();

  const day = moment(date).format("dddd");
  const month = moment(date).format("MMM").toUpperCase();
  const year = moment(date).format("yyyy");

  return (
    <div className={classes.header}>

      <div className={classes.top}>
        <span>{ month }</span> <span>{ year }</span> <span className={classes.bull}>&bull;</span> <span>{ itemCount }</span> <span>TODO{ itemCount === 1 ? '' : 'S'}</span>
      </div>

      <div className={classes.bottom}>
        <span>{ day }</span>
        <div className={classes.underline} />
      </div>

    </div>
  );
}