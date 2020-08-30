import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortIcon from '@material-ui/icons/Sort';

import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ScheduleIcon from '@material-ui/icons/Schedule';

export default function SundialAgendaTodoListHeader({ date, itemCount, selectedSort=-1, onSortClick, forceAnimationsOff=null }) {
  // const [isStrokingDate, setIsStrokingDate] = React.useState(false);
  const [strokedDate, setStrokedDate] = React.useState(forceAnimationsOff);
  const [moreMenuOpenAnchor, setMoreMenuOpenAnchor] = React.useState(null);

  // useEffect(() => {
  //   if (strokedDate === date) {
  //     return;
  //   }

  //   if (isStrokingDate === true) {
  //     return;
  //   }

  //   setIsStrokingDate(true);
  //   setTimeout(() => {
  //     setStrokedDate(date);
  //     setIsStrokingDate(false);
  //   }, 1700);
  // }, [isStrokingDate, setIsStrokingDate, strokedDate, setStrokedDate]);

  const handleUnderlineAnimationEnd = () => {
    setStrokedDate(date);
  }

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
    },
    rightToolbar: {
      display: 'inline-block',
      position: 'absolute',

      top: 20,
      right: 20,

      // textAlign: 'right',
      // float: 'right',
    },
    menu: {


    },
    menuItem: {
      cursor: 'pointer',

      '& > svg': {
        marginRight: 6,
      }
    }
  }))();

  const day = moment(date).format("dddd");
  const month = moment(date).format("MMM").toUpperCase();
  const year = moment(date).format("yyyy");

  const handleHeaderMoreButtonClick = (event) => {
    setMoreMenuOpenAnchor(event.currentTarget);
  }

  const handleMoreMenuClose = () => {
    setMoreMenuOpenAnchor(null);
  }

  const handleMenuItemClick = (index) => {
    onSortClick(index);
    setMoreMenuOpenAnchor(null);
  }

  return (
    <div className={classes.header}>

      <div className={classes.top}>
        <span>{ month }</span> <span>{ year }</span> <span className={classes.bull}>&bull;</span> <span>{ itemCount }</span> <span>TODO{ itemCount === 1 ? '' : 'S'}</span>
      </div>

      <div className={classes.bottom}>
        <span>{ day }</span>
        
        { strokedDate === date || forceAnimationsOff === true ? '' : <div className={classes.underline} onAnimationEnd={ handleUnderlineAnimationEnd }/> }
      </div>


      <div className={classes.rightToolbar}>
        <IconButton size="medium" edge="end" onClick={ handleHeaderMoreButtonClick }>
          <MoreVertIcon />
        </IconButton>
      </div>

      <Menu
        className={ classes.menu }
        open={ Boolean(moreMenuOpenAnchor) }
        anchorEl={ moreMenuOpenAnchor }
        onClose={ handleMoreMenuClose }
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem disabled className={classes.menuItem}>
          <SortIcon /> Sort
        </MenuItem>

        <Divider />

        <MenuItem onClick={ () => handleMenuItemClick(0) } selected={selectedSort === 0} className={classes.menuItem}>
          <SortByAlphaIcon /> Alphabetical
        </MenuItem>

        <MenuItem onClick={ () => handleMenuItemClick(1) } selected={selectedSort === 1} className={classes.menuItem}>
          <DoneAllIcon /> Checked
        </MenuItem>

        <MenuItem onClick={ () => handleMenuItemClick(2) } selected={selectedSort === 2} className={classes.menuItem}>
          <ScheduleIcon /> Last Edited
        </MenuItem>
      </Menu>
    </div>
  );
}