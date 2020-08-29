import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import sundialLogo from '../img/sundial-800x800.png';

import '../css/SundialSplashPage.css';

const imageSize = '240px';

const useStyles = makeStyles((theme) => ({
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

  root: {
    zIndex: 9999,
    minWidth: '260px',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    textAlign: 'center',
    alignItems: 'middle',
    verticalAlign: 'middle',

    background: 'linear-gradient(-45deg, rgba(131,73,247,1) 0%, rgba(125,71,231,1) 5%, rgba(116,71,203,1) 11%, rgba(114,70,201,1) 23%, rgba(98,57,177,1) 42%, rgba(94,56,170,1) 48%, rgba(94,53,177,1) 52%, rgba(90,61,186,1) 66%, rgba(94,83,187,1) 83%, rgba(98,102,199,1) 100%)',
    backgroundSize: '800% 800%',
    animation: '$backgroundFade 8s ease infinite alternate',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    top: `calc(45vh - calc(${imageSize} / 2))`,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 18,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  }
}));

export default function SundialSplashPage({ duration }) {
  const classes = useStyles();
  
  const durationMS = `${duration}ms`;

  return (
    <div className={ classes.root }>
      <div className={ classes.container}>
        <img alt="Sundial" src={ sundialLogo } className={ classes.image } style={{
          animation: `SundialSplash_fadeInOut ${durationMS} forwards`
        }}/>
      </div>
    </div>
  );
}
