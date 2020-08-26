import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAuthPage from './SundialAuthPage';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}));

export default function SundialRootPage() {
  const classes = useStyles();

  const [authedToken, setAuthedToken] = React.useState(null);

  const handleAuthedTokenSuccess = (token) => {
    setAuthedToken(token);
  }

  const unauthedContent = (
    <div>
      <SundialAuthPage
        onAuthedTokenSuccess={ handleAuthedTokenSuccess }
      />
    </div>
  );

  const authedContent = (
    <div>
      Authed!
    </div>
  );

  return (
    <div className={classes.root}>
      { !authedToken ? unauthedContent : authedContent }
    </div>
  );
}