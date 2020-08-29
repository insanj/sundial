import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Tilt from 'react-tilt'

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: 'top',
    display: 'inline-block',
    margin: 6,

    width: 'calc(33% - 15px)',

    [theme.breakpoints.down(1024)]: {
      width: '290px',
    },


    // [theme.breakpoints.down(960)]: {
    //   width: 'calc(35% - 15px)',
    // },


    // [theme.breakpoints.down(920)]: {
    //   width: '280px',
    // },

    [theme.breakpoints.down(660)]: {
      width: 'calc(85% - 15px)',
    },
  },
  card: {
    padding: 20,
    borderRadius: 20,

    boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
    background: '#2f302f',

    textAlign: 'left',
    cursor: 'pointer',
  },
  imageContainer: {

  },
  image: {
    width: '60px',
    height: '60px',
  },
  title: {
    paddingTop: 10,
    fontWeight: 500,
    fontSize: '1.3rem',
    letterSpacing: 0,
    color: 'rgba(255,255,255,1)'
  },
  body: {
    paddingTop: 10,
    fontSize: '1.0rem',
    lineHeight: 1.3,
    color: 'rgba(255,255,255,0.8)'

  }
}));

export default function SundialAuthFeatureCard({ feature }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tilt className="Tilt" options={{ perspective: 800, speed: 800, scale: 1.05 }}>
        <div className={classes.card}>
          <div className="Tilt-inner">
            <div className={classes.imageContainer} key={1}>
              <img alt={ feature.title } className={classes.image} src={ feature.image } />
            </div>

            <div className={classes.title} key={2}>
              { feature.title }
            </div>

            <div className={classes.body} key={3}>
              { feature.body }
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}