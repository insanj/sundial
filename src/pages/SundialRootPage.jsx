import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAuthPage from './SundialAuthPage';
import SundialAgendaPage from './SundialAgendaPage';

import SundialNetworker from '../backend/SundialNetworker';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '250px',
  },

}));

export default function SundialRootPage() {
  const classes = useStyles();
  const networker = new SundialNetworker();

  const [authedToken, setAuthedToken] = React.useState(null);

  const handleAuthedTokenSuccess = (token) => {
    setAuthedToken(token);
  }

  const unauthedContent = (
    <div>
      <SundialAuthPage
        networker={ networker }
        onAuthedTokenSuccess={ handleAuthedTokenSuccess }
      />
    </div>
  );

  const authedContent = (
    <div>
      <SundialAgendaPage 
        networker={ networker }
        token={ authedToken }
      />
    </div>
  );

  return (
    <div className={classes.root}>
      { !authedToken ? unauthedContent : authedContent }
    </div>
  );
}
