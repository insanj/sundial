import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
    "root": {
    },
    "header": {
        "fontFamily": "Lato-Bold"
    },
    "headerSubtitle": {
        "fontFamily": "Lato-Black",
        "opacity": 0.4,
        "lineHeight": 1,
        "margin": 0,
        "padding": 0,
        "fontSize": "0.7rem",
        "fontWeight": 800
    },
    "textArea": {
        "background": "none",
        "color": theme.palette.primary.contrastText,

        "border": `1px solid ${theme.palette.secondary.main}`,
        "borderRadius": 8,

        "resize": "none",

        "fontFamily": "Lato-Bold",
        "fontSize": "1.2rem",
        "fontWeight": 400,

        "padding": 5,
        "width": "100%"
    },
    "textAreaContainer": {
        "margin": 10
    },
    "progress": {
    }
}));

export default function SundialEditTodoDialog ({open, item, onSaveClick, onDeleteClick, onCloseClick, isLoadingState, textAreaValue, onTextAreaInputChange}) {

    const classes = useStyles(),

        handleCloseClick = () => {

            onCloseClick();

        },

        handleSaveClick = () => {

            if (!textAreaValue || textAreaValue.trim().length < 1) {

                alert("You cannot save an empty Todo! Type something in and try again.");
                return;

            }

            item.name = textAreaValue;
            onSaveClick(item);

        },

        handleDeleteClick = () => {

            onDeleteClick(item);

        },

        daySubtitle = !item ? "" : moment(item.date).format("DD MMMM yyyy").
            toUpperCase(); // 15 AUGUST 2020

    return (
        <div className={classes.root}>
            <Dialog
                aria-labelledby="form-dialog-title"
                onClose={handleCloseClick}
                open={open}
            >
                <DialogTitle id="form-dialog-title">
                    <div className={classes.header}>
                        Edit Todo
                    </div>
                    <div className={classes.headerSubtitle}>
                        { daySubtitle }
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.textAreaContainer}>
                        <TextareaAutosize
                            autoFocus
                            className={classes.textArea}
                            color="secondary"
                            disabled={isLoadingState === true}
                            fullWidth
                            id="name"
                            margin="dense"
                            onChange={onTextAreaInputChange}
                            rowsMax={15}
                            style={{
                                "opacity": isLoadingState === true ? 0.5 : 1.0
                            }}
                            type="text"
                            value={textAreaValue}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={handleCloseClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="secondary"
                        disabled={isLoadingState === true}
                        onClick={handleDeleteClick}
                        variant="outlined"
                    >
                        Delete
                    </Button>
                    <Button
                        color="secondary"
                        disabled={isLoadingState === true}
                        onClick={handleSaveClick}
                        variant="contained"
                    >
                        { isLoadingState !== true ? "Save"
                            : <CircularProgress
                                color="secondary"
                                size={24}
                              />}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}
