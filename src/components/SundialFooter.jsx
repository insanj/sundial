import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import preval from 'preval.macro';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.header,
    backgroundColor: 'none',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: "rgba(255,255,255,0.1)",
    marginTop: 200,
    paddingBottom: 40,

    '& > a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
}));

export default function SundialFooter() {
  const classes = useStyles();
  let compileDateString = preval`module.exports = new Date().toLocaleString("en").toLowerCase();`;
  let gitTagVersionString = process.env.REACT_APP_SUNDIAL_TAG;

  return (
    <div className={classes.root}>
      <a href="http://github.com/insanj/sundial">v{ gitTagVersionString } ({ compileDateString })</a>
      <br/>
      &copy; 2020 <a href="http://snowcode.design">Snowcode, LLC</a>
    </div>
  );
}
