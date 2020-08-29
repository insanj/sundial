import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SundialAuthPage from './SundialAuthPage';
import SundialAgendaPage from './SundialAgendaPage';
import SundialSplashPage from './SundialSplashPage';

import SundialNetworker from '../backend/SundialNetworker';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '250px',
  },
}));

export default function SundialRootPage() {
  const classes = useStyles();
  const networker = new SundialNetworker();

  const splashAnimationDuration = 1100;
  const [splashAnimationCompleted, setSplashAnimationCompleted] = React.useState(false);
  const [authedToken, setAuthedToken] = React.useState(null);
  const [addedEventListener, setAddedEventListener] = React.useState(false);

  const handleAuthGoogleSuccess = (user) => {
    // const googleUser = {
    //   getAuthResponse: () => {
    //     return {
    //       id_token: user['wc']['access_token']
    //     };
    //   },
    //   getBasicProfile: () => {
    //     return {
    //       getName: () => {
    //         return user['rt']['Ad'];
    //       },
    //       getImageUrl: () => {
    //         return user['rt']['TJ'];
    //       },
    //       getEmail: () => {
    //         return user['rt']['$t'];
    //       },
    //       getId: () => {
    //         return user['rt']['NT'];
    //       }
    //     }
    //   }
    // };

    handleGoogleSignInSuccess(user);
  }

  const unauthedContent = (
    <div>
      <SundialAuthPage
        networker={ networker }
        onGoogleSuccess={ handleAuthGoogleSuccess }
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

  const splashContent = (
    <div>
      <SundialSplashPage
        duration={ splashAnimationDuration }
      />
    </div>
  );

  // learn more @ https://developers.google.com/identity/sign-in/web/backend-auth
  const handleGoogleSignInSuccess = (googleUser) => {
    const token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();

    const payload = {
      metadata: {
        name: profile.getName(),
        image: profile.getImageUrl(),
        email: profile.getEmail(),
      },
      token: token,
      googleId: profile.getId()
    };

    networker.login(payload).then(r => {
      setAuthedToken(token);
    }).catch(e => {
      console.log(`Unable to log in with Google: ${JSON.stringify(e)}`);
    });
  }

  useEffect(() => {
    if (addedEventListener) {
      return;
    }

    setAddedEventListener(true);
    setTimeout(() => {
      setSplashAnimationCompleted(true);
    }, splashAnimationDuration);

  }, [addedEventListener, setAddedEventListener, splashAnimationCompleted, setSplashAnimationCompleted]);

  return (
    <div className={classes.root}>
      { !authedToken ? unauthedContent : authedContent }
      { !splashAnimationCompleted ? splashContent : '' }
    </div>
  );
}
