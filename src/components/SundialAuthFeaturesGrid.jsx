import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAuthFeatureCard from './SundialAuthFeatureCard';

import featureFileHeart from '../img/noun_intellectual property right_3293613.svg';
import featureAgenda from '../img/noun_organizer_3293624.svg';
import featureCloud from '../img/noun_Sell Ebook_3293619.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '900px',

    minHeight: '100px',

    marginLeft: 'auto',
    marginRight: 'auto',

    paddingTop: '26px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },

  grid: {
    width: '100%',

    textAlign: 'center',
  }
}));

export default function SundialAuthFeaturesGrid({}) {
  const classes = useStyles();


  const features = [{
    image: featureAgenda,
    title: "Break Down Your Day",
    body: (
      <span>
        <b>Sundial</b> makes it easy to figure out what you have to do and when it's important to focus on a new task. Goodbye, todo list.
      </span>
    )
  }, {
    image: featureCloud,
    title: "Agenda In The Cloud",
    body: (
      <span>
        Responsive and mobile-friendly, <b>Sundial</b> works anywhere. Put your priorities somewhere special.
      </span>
    )
  }, {
    image: featureFileHeart,
    title: "Free, Open Source",
    body: (
      <span>
        Still choosing the best app? <b>Sundial</b> is free to use, forever. You can even learn how it works on Github and request new features.
      </span>
    )
  }]

  return (
    <div className={classes.root}>
      <div className={classes.grid}>

        { features.map(f => {
          return (
            <SundialAuthFeatureCard 
              feature={ f }
            />
          );
        }) }
        
      </div>
    </div>
  );
}