import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import EventIcon from '@material-ui/icons/Event';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';
import preval from 'preval.macro';

import sundialLogo from '../img/sundial-800x800.png';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1
    }
  },

  '@keyframes moveDown': {
    '0%': {
      transform: 'translate(0, -10px)',
    },
    '100%': {
      transform: 'translate(0, 0px)',
    }
  },

  root: {
    flexGrow: 1,
    paddingTop: 74,
  },
  '@keyframes backgroundFade': {
    '0%': {
      backgroundPosition: '100% 50%'
    },
    '50%': {
      backgroundPosition: '0% 50%'
    },
    '100%': {
      backgroundPosition: '100% 50%%'
    }
  },

  appBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    
    background: 'linear-gradient(-45deg, rgba(131,73,247,1) 0%, rgba(125,71,231,1) 5%, rgba(116,71,203,1) 11%, rgba(114,70,201,1) 23%, rgba(98,57,177,1) 42%, rgba(94,56,170,1) 48%, rgba(94,53,177,1) 52%, rgba(90,61,186,1) 66%, rgba(94,83,187,1) 83%, rgba(98,102,199,1) 100%)',

    backgroundSize: '800% 800%',
    animation: '$backgroundFade 30s ease infinite alternate',

    '& > *': {
      animation: '$fadeIn 2s ease-in forwards, $moveDown 2s ease-out forwards'
    }
  },
  menuButton: {
  },
  calendarButton: {
    marginRight: 0,
    marginLeft: 0,
  },
  menuButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    boxShadow: '0px 0px 4px rgba(0,0,0,0.1)'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SundialAgendaAppBar({ onLogoClick, onSearchInputChange, searchPlaceholder, selectedDate, onCalendarDateSelected }) {
  const classes = useStyles();

  const [calendarDropdownMenuAnchor, setCalendarDropdownMenuAnchor] = React.useState(null);

  const handleSearchInputChange = (event) => {
    onSearchInputChange(event.target.value);
  }

  const handleCalendarIconClick = (event) => {
    setCalendarDropdownMenuAnchor(event.currentTarget);
  }

  const handleCalendarDropdownMenuClose = () => {
    setCalendarDropdownMenuAnchor(null);
  }

  const handleCelandarDateChange = (event) => {
    onCalendarDateSelected(event.target.value);
  }

  const calendarInputCurrentValue = moment(selectedDate).format('YYYY-MM-DD');
  const calendarInputDropdownMenu = (
    <Menu
      id="simple-menu"
      anchorEl={calendarDropdownMenuAnchor}
      keepMounted
      open={Boolean(calendarDropdownMenuAnchor)}
      onClose={handleCalendarDropdownMenuClose}
    >
      <MenuItem>
        <input 
          type="date" 
          value={ calendarInputCurrentValue }
          onChange={ handleCelandarDateChange }>
        </input>
      </MenuItem>
      <MenuItem onClick={handleCalendarDropdownMenuClose}>
        Close
      </MenuItem>
    </Menu>
  );

  const compileDateString = preval`module.exports = new Date().toLocaleString("en").toLowerCase();`;
  const versionString = `v${ process.env.REACT_APP_SUNDIAL_TAG } (${ compileDateString })`;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <LightTooltip 
            placement="right" 
            title={`Sundial is made with ❤️ from Philly. Click to sign out! You are using ${versionString}`}
          >
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={ onLogoClick }
            >
              <img alt="Sundial" src={ sundialLogo } className={classes.menuButtonImage} />
            </IconButton>
          </LightTooltip>

          <Typography className={classes.title} variant="h5" noWrap>
            Sundial
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={ searchPlaceholder }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={ handleSearchInputChange }
            />
          </div>


          <IconButton
            edge="end"
            color="inherit"
            className={classes.calendarButton}
            onClick={ handleCalendarIconClick }
          >
            <EventIcon />
          </IconButton>

          { calendarInputDropdownMenu }
        </Toolbar>
      </AppBar>
    </div>
  );
}
