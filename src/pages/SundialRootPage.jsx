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
  const [authedToken, setAuthedToken] = React.useState('eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhN2RjMTI2NjQ1OTBjOTU3ZmZhZWJmN2I2NzE4Mjk3Yjg2NGJhOTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTM2NTE5MDU1Mjk3LW52YWdmdmYzcGpwN3J1aTIxYWFyMWNkNTVraGloNHZxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTM2NTE5MDU1Mjk3LW52YWdmdmYzcGpwN3J1aTIxYWFyMWNkNTVraGloNHZxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0OTA0NzM3MzEzMDE3NjM0MzIyIiwiZW1haWwiOiJpbnNhbmpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJCNnVvVnZzTi1UZHNvMHZRcG41Y3BnIiwibmFtZSI6Ikp1bGlhbiAoaW5zYW5qKSBXZWlzcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3l5QVprZDRMNDAyVE56UkNSei05LS1iNnhFSW1JaTRpOTlISUNYZz1zOTYtYyIsImdpdmVuX25hbWUiOiJKdWxpYW4gKGluc2FuaikiLCJmYW1pbHlfbmFtZSI6IldlaXNzIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTg3NDc1ODMsImV4cCI6MTU5ODc1MTE4MywianRpIjoiYTkyYjljZjdmYzBlZmJmNmNkNGExN2IwYWU0MzVkMDY5MmQ0ZTRhNSJ9.GNpk2cnrpzxMnTO-Go19ORYFj2s-Xjyx-_1jCCjssK3fWsPCEZBMaHR_q9JgYRp4ycRi5y6EV2GX4f5SkBuTGozVNX-gQ7dVAJIQiYkuzUOhpK9APx6ktaHPNqnjko3GOH8d0E3Zumq1OOVJxzIkpMwgNKyJmGaOvlxYOFmfNYPTqL3Gb8BAxVKQ3ZUKWOGAdDUXy7Fhv4LM3PEPgHmlAqIOUMqEYgKLwiZlxp7vWjhNDfGaWWP2ZFGNg_MAMBc19V4kw5PSNnlhj6yQa_hML2DUzCE4z1ygIYAZMvmyqUt-8c0ppXM4hU9bZxG5Fnpl5EllPAUW-17iUfgonM_lVQ');
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
