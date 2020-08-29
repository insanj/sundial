import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";

import emptyState from "../img/empty_state.png";
import CreateIcon from "@material-ui/icons/Create";

export default function SundialAgendaTodoListEmpty () {

    const classes = makeStyles((theme) => ({
        "root": {
            "padding": "50px",
            "paddingTop": "18px",
            "textAlign": "center",

            "maxWidth": "450px",
            "height": "auto",

            "marginRight": "auto",
            "marginLeft": "auto",
            "overflow": "hidden"
        },
        "image": {
            "width": "100%",
            "height": "auto",
            "objectFit": "contain"
        },
        "title": {
            "fontFamily": "Lato-Bold",
            "fontWeight": 800,
            "fontSize": "1.5rem",
            "letterSpacing": 0.0,
            "opacity": 0.8,
            "lineHeight": 1.1
        },
        "body": {
            "fontWeight": 500,
            "fontSize": "1.1rem",
            "opacity": 0.7,

            [theme.breakpoints.down(415)]: {
                "paddingTop": 8
            }
        },
        "brand": {
            "color": theme.palette.secondary.main
        },
        "add": {
            "display": "inline-block",
            "verticalAlign": "middle",

            "background": "white",
            "color": "rgba(0,0,0,0.8)",

            "padding": 6,
            "borderRadius": 19,

            "width": 38,
            "height": 38,

            "transform": "scale(0.7,0.7)"
        },
        "callToAction": {
            "display": "inline",

            [theme.breakpoints.down(415)]: {
                "display": "inline-block"
            }
        }

    }))();

    return (
        <div className={classes.root}>
            <img
                className={classes.image}
                src={emptyState}
            />


            <div className={classes.title}>
                Ready to fill in your day?
            </div>

            <div className={classes.body}>
                <span className={classes.brand}>
                    Sundial
                </span>
                {" "}
                is too.
                <div className={classes.callToAction}>
                    Tap
                    <div className={classes.add}>
                        <CreateIcon />
                    </div>
                    {" "}
                    to create a todo.
                </div>
            </div>
        </div>
    );

}
