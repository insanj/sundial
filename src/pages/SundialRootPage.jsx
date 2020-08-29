import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";

import SundialAuthPage from "./SundialAuthPage";
import SundialAgendaPage from "./SundialAgendaPage";
import SundialSplashPage from "./SundialSplashPage";

import SundialNetworker from "../backend/SundialNetworker";

const useStyles = makeStyles((theme) => ({
    "root": {
        "minWidth": "250px"
    }

}));

export default function SundialRootPage () {

    const classes = useStyles(),
        networker = new SundialNetworker(),

        splashAnimationDuration = 1100,
        [
            splashAnimationCompleted,
            setSplashAnimationCompleted
        ] = React.useState(false),
        [
            authedToken,
            setAuthedToken
        ] = React.useState(null),
        [
            addedEventListener,
            setAddedEventListener
        ] = React.useState(false),

        handleAuthGoogleSuccess = (user) => {

            handleGoogleSignInSuccess(user);

        },

        unauthedContent =
            <div>
             <SundialAuthPage
                 networker={networker}
                 onGoogleSuccess={handleAuthGoogleSuccess}
             />
         </div>,
        authedContent =
            (<div>
         <SundialAgendaPage
             networker={networker}
             token={authedToken}
         />
     </div>),
        splashContent =
            (<div>
         <SundialSplashPage
             duration={splashAnimationDuration}
         />
     </div>),

        // Learn more @ https://developers.google.com/identity/sign-in/web/backend-auth
        handleGoogleSignInSuccess = (googleUser) => {

            const token = googleUser.getAuthResponse().id_token,
                profile = googleUser.getBasicProfile(),

                payload = {
                    "metadata": {
                        "name": profile.getName(),
                        "image": profile.getImageUrl(),
                        "email": profile.getEmail()
                    },
                    token,
                    "googleId": profile.getId()
                };

            networker.login(payload).then((r) => {

                setAuthedToken(token);

            }).
                catch((e) => {

                    console.log(`Unable to log in with Google: ${JSON.stringify(e)}`);

                });

        };

    useEffect(
        () => {

            if (addedEventListener) {

                return;

            }

            setAddedEventListener(true);

            setTimeout(
                () => {

                    setSplashAnimationCompleted(true);

                },
                splashAnimationDuration
            );

            /*
             * Window.addEventListener("SundialGoogleSignIn", (event) => {
             *   const googleUser = event.detail;
             *   handleGoogleSignInSuccess(googleUser);
             * });
             */

        },
        [
            addedEventListener,
            setAddedEventListener,
            setSplashAnimationCompleted
        ]
    );

    return (
        <div className={classes.root}>
            { !authedToken ? unauthedContent : authedContent }
            { !splashAnimationCompleted ? splashContent : "" }
        </div>
    );

}
