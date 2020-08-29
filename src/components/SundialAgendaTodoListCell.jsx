import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import Tilt from "react-tilt";

const useStyles = makeStyles((theme) => ({
    "root": {
        "display": "inline-block",
        "cursor": "pointer"

    },
    "content": {
        "paddingLeft": 0,
        "paddingRight": 10,
        "verticalAlign": "middle"
    },
    "title": {
        "display": "inline-block",
        "verticalAlign": "middle",

        "fontSize": "1.8rem",

        "paddingTop": 4,
        "paddingBottom": 4,
        "paddingRight": 4
    }
}));

export default function SundialAgendaTodoListCell ({item, checked, onCheckboxClick, onClick}) {

    const classes = useStyles(),

        handleClick = () => {

            onClick(item);
            // OnCheckboxClick(item, !checked);

        },

        handleCheckboxClick = (event) => {

            onCheckboxClick(
                item,
                event.target.checked
            );

        };

    return (
        <div className={classes.root}>
            <Tilt
                className="Tilt"
                options={{"perspective": 900,
                    "scale": 1.1}}
            >
                <Paper className={classes.paper}>
                    <div className="Tilt-inner">
                        <div className={classes.content}>
                            <Checkbox
                                checked={checked}
                                onChange={handleCheckboxClick}
                            />

                            <div
                                className={classes.title}
                                onClick={handleClick}
                            >
                                { item.name }
                            </div>
                        </div>
                    </div>
                </Paper>
            </Tilt>
        </div>
    );

}
