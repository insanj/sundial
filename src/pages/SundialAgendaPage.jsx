import React, {useEffect} from "react";
import {ThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core/styles";

import SundialAgendaAppBar from "../components/SundialAgendaAppBar";
import SundialAgendaCalendar from "../components/SundialAgendaCalendar";
import SundialAgendaTodoList from "../components/SundialAgendaTodoList";
import SundialAgendaFAB from "../components/SundialAgendaFAB";
import SundialNewTodoDialog from "../components/SundialNewTodoDialog";
import SundialEditTodoDialog from "../components/SundialEditTodoDialog";

import Snackbar from "@material-ui/core/Snackbar";

import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";

import moment from "moment";

const bannerTheme = createMuiTheme({
    "palette": {
        "type": "light"
    },
    "typography": {
        "fontFamily": "Lato"
    }
});

function SlideTransition (props) {

    return (<Slide {...props}
direction="up" />);

}

const useStyles = makeStyles((theme) => ({
    "@keyframes fadeIn": {
        "0%": {
            "opacity": 0
        },
        "100%": {
            "opacity": 1
        }
    },

    "@keyframes moveUp": {
        "0%": {
            "transform": "translate(0, 10px)"
        },
        "100%": {
            "transform": "translate(0, 0px)"
        }
    },

    "root": {
        "minWidth": "270px"
    },

    "footer": {
        "marginTop": 5
    },

    "calendar": {
        "position": "fixed"
    },

    "calendarPadding": {
        "height": "60px"
    },

    "todoList": {
        "animation": "$moveUp 2s ease-out forwards"
    },

    "snackbar": {
        "cursor": "pointer",
        "bottom": 30,
        "left": 30,

        [theme.breakpoints.down(320)]: {
            "bottom": 90
        }
    }
}));

export default function SundialAgendaPage ({networker, token}) {

    const classes = useStyles(),

        [
            searchInput,
            setSearchInput
        ] = React.useState(""),
        [
            selectedDate,
            setSelectedDate
        ] = React.useState(new Date()),

        [
            loadedTodoListItemDate,
            setLoadedTodoListItemDate
        ] = React.useState(null),
        [
            loadedTodoListItems,
            setLoadedTodoListItems
        ] = React.useState(null),

        [
            isNewTodoDialogOpen,
            setIsNewTodoDialogOpen
        ] = React.useState(false),
        [
            isNewTodoSaveInProgress,
            setIsNewTodoSaveInProgress
        ] = React.useState(false),

        [
            newTodoDialogTextAreaValue,
            setNewTodoDialogTextAreaValue
        ] = React.useState(""),

        [
            newTodoSnackbarOpen,
            setNewTodoSnackbarOpen
        ] = React.useState(false),

        [
            isEditTodoDialogOpen,
            setIsEditTodoDialogOpen
        ] = React.useState(false),
        [
            editTodoDialogItem,
            setEditTodoDialogItem
        ] = React.useState(null),
        [
            isEditTodoSaveInProgress,
            setIsEditTodoSaveInProgress
        ] = React.useState(false),
        [
            editTodoDialogTextAreaValue,
            setEditTodoDialogTextAreaValue
        ] = React.useState(""),

        load = () => {

            networker.getItems({token}).then((r) => {

                setLoadedTodoListItems(r.data);

            }).
                catch((e) => {

                    console.log(e);

                });

        };

    useEffect(
        () => {

            if (loadedTodoListItemDate) {

                return;

            }

            setLoadedTodoListItemDate(selectedDate);
            load();

        },
        [
            loadedTodoListItemDate,
            setLoadedTodoListItemDate,
            selectedDate,
            load
        ]
    );

    const getTodoListItemsForSelectedDate = () => {

            if (!loadedTodoListItems || loadedTodoListItems.length < 1) {

                return loadedTodoListItems;

            }

            const selectedMoment = moment(selectedDate),
                filtered = loadedTodoListItems.filter((i) => {

                    const dateMoment = moment(i.date);
                    return dateMoment.day() === selectedMoment.day() && dateMoment.month() === selectedMoment.month() && dateMoment.year() === selectedMoment.year();

                }),

                sorted = filtered.sort((s1, s2) => s1.name.localeCompare(s2.name));

            if (!searchInput || searchInput.length < 1) {

                return sorted;

            }

            const searchWords = searchInput.toLowerCase().split(" "),
                searched = sorted.filter((i) => {

                    const words = i.name.toLowerCase(),
                        wordsMatched = searchWords.filter((w) => words.includes(w));

                    return wordsMatched.length > 0;

                });

            return searched;

        },

        getDatesToUnreadItemsForSelectedDate = () => {

            if (!loadedTodoListItems || loadedTodoListItems.length < 1) {

                return loadedTodoListItems;

            }

            const datesToUnread = {},
                dateFormat = "YYYY-MM-DD";

            for (const item of loadedTodoListItems) {

                const dateMoment = moment(item.date),
                    dateKey = dateMoment.format(dateFormat),

                    isUnread = !item.metadata || !item.metadata.checked || item.metadata.checked !== "true";

                if (isUnread !== true) {

                    continue;

                }

                const existing = datesToUnread[dateKey];
                if (existing) {

                    existing.push(item);
                    datesToUnread[dateKey] = existing;

                } else {

                    const array = [item];
                    datesToUnread[dateKey] = array;

                }

            }

            return datesToUnread;

        },

        handleSearchInputChange = (newSearchInput) => {

            setSearchInput(newSearchInput);

        },

        handleCalendarDateClick = (newSelectedDate) => {

            setSelectedDate(newSelectedDate);

        },

        handleTodoListItemEditSubmit = (todoListItem) => {

            networker.editItem({
                token,
                "id": todoListItem.id,
                "name": todoListItem.name,
                "date": todoListItem.date,
                "metadata": todoListItem.metadata
            }).then((r) => {

                load();

            }).
                catch((e) => {

                    console.log(e);

                });

        },

        handleTodoListItemDeleteSubmit = (todoListItem) => {

            alert("Delete item!");

        },

        handleAppBarLogoClick = () => {

            const confirm = window.confirm("Thanks for coming! Would you like to sign out of Sundial?");
            if (!confirm) {

                return;

            }

            const auth2 = window.gapi.auth2.getAuthInstance();
            auth2.signOut().then(() => {

                window.location.href = "/";

            });

        },

        handleFloatingActionButtonClick = () => {

            setIsNewTodoDialogOpen(true);

        },

        handleNewTodoDialogTextAreaInputChange = (event) => {

            setNewTodoDialogTextAreaValue(event.target.value);

        },

        handleNewTodoDialogCloseClick = () => {

            setIsNewTodoDialogOpen(false);

        },

        handleNewTodoDialogSaveClick = () => {

            setIsNewTodoSaveInProgress(true);

            networker.newItem({
                token,
                "name": newTodoDialogTextAreaValue,
                "date": selectedDate,
                "metadata": {}
            }).then((r) => {

                load();

                setNewTodoSnackbarOpen(true);
                setIsNewTodoSaveInProgress(false);
                setIsNewTodoDialogOpen(false);
                setNewTodoDialogTextAreaValue("");

            }).
                catch((e) => {

                    alert("Uh oh... We weren't able to save that Todo. Try again?");
                    console.log(e);
                    setIsNewTodoSaveInProgress(false);

                });

        },

        handleAppBarCalendarDateSelected = (newDate) => {

            setSelectedDate(newDate);
            load();

        },

        handleTodoListItemClick = (todoListItem) => {

            setEditTodoDialogItem(todoListItem);
            setEditTodoDialogTextAreaValue(todoListItem.name);
            setIsEditTodoDialogOpen(true);

        },

        handleEditTodoDialogTextAreaInputChange = (event) => {

            setEditTodoDialogTextAreaValue(event.target.value);

        },

        handleEditTodoDialogCloseClick = () => {

            setIsEditTodoDialogOpen(
                false,
                () => {

                    setEditTodoDialogItem(null);
                    setEditTodoDialogTextAreaValue("");

                }
            );

        },

        handleEditTodoDialogSaveClick = (todoListItem) => {

            setIsEditTodoSaveInProgress(true);

            networker.editItem({
                token,
                "id": todoListItem.id,
                "name": todoListItem.name,
                "date": todoListItem.date,
                "metadata": todoListItem.metadata && Object.keys(todoListItem.metadata).length > 0 ? todoListItem.metadata : {"checked": false}
            }).then((r) => {

                setIsEditTodoSaveInProgress(false);
                setIsEditTodoDialogOpen(false);
                setEditTodoDialogTextAreaValue(todoListItem.name);

                load();

            }).
                catch((e) => {

                    setIsEditTodoSaveInProgress(false);

                    load();
                    console.log(e);

                });

        },

        handleEditTodoDialogDeleteClick = (todoListItem) => {

            const confirm = window.confirm("Are you sure you want to delete this Todo? You cannot undo this action!");
            if (!confirm) {

                return;

            }

            setIsEditTodoSaveInProgress(true);

            networker.deleteItem({
                token,
                "id": todoListItem.id
            }).then((r) => {

                setIsEditTodoSaveInProgress(false);
                setIsEditTodoDialogOpen(false);
                setEditTodoDialogTextAreaValue(todoListItem.name);

                load();

            }).
                catch((e) => {

                    setIsEditTodoSaveInProgress(false);

                    load();
                    console.log(e);

                });

        };

    return (
        <div className={classes.root}>
            <SundialAgendaAppBar
                onCalendarDateSelected={handleAppBarCalendarDateSelected}
                onLogoClick={handleAppBarLogoClick}
                onSearchInputChange={handleSearchInputChange}
                searchPlaceholder={`Search ${moment(selectedDate).format("M/D/YY")}...`}
                selectedDate={selectedDate}
            />

            <div className={classes.calendar}>
                <SundialAgendaCalendar
                    datesToUnreadItems={getDatesToUnreadItemsForSelectedDate()}
                    onDateClick={handleCalendarDateClick}
                    selectedDate={selectedDate}
                />
            </div>

            <div className={classes.calendarPadding} />

            <div className={classes.todoList}>
                <SundialAgendaTodoList
                    items={getTodoListItemsForSelectedDate()}
                    onItemClick={handleTodoListItemClick}
                    onItemEditSubmit={handleTodoListItemEditSubmit}
                    selectedDate={selectedDate}
                />
            </div>

            <SundialAgendaFAB
                onClick={handleFloatingActionButtonClick}
            />

            <SundialNewTodoDialog
                isLoadingState={isNewTodoSaveInProgress}
                onCloseClick={handleNewTodoDialogCloseClick}
                onSaveClick={handleNewTodoDialogSaveClick}
                onTextAreaInputChange={handleNewTodoDialogTextAreaInputChange}
                open={isNewTodoDialogOpen}
                selectedDate={selectedDate}
                textAreaValue={newTodoDialogTextAreaValue}
            />

            <SundialEditTodoDialog
                isLoadingState={isEditTodoSaveInProgress}
                item={editTodoDialogItem}
                onCloseClick={handleEditTodoDialogCloseClick}
                onDeleteClick={handleEditTodoDialogDeleteClick}
                onSaveClick={handleEditTodoDialogSaveClick}
                onTextAreaInputChange={handleEditTodoDialogTextAreaInputChange}
                open={isEditTodoDialogOpen}
                textAreaValue={editTodoDialogTextAreaValue}
            />

            <ThemeProvider theme={bannerTheme}>
                <Snackbar
                    TransitionComponent={SlideTransition}
                    anchorOrigin={{
                        "vertical": "bottom",
                        "horizontal": "left"
                    }}
                    autoHideDuration={3400}
                    className={classes.snackbar}
                    onClick={() => setNewTodoSnackbarOpen(false)}
                    onClose={() => setNewTodoSnackbarOpen(false)}
                    open={newTodoSnackbarOpen}
                >
                    <div>
                        <Alert
                            severity="success"
                            variant="filled"
                        >
                            New Todo Added!
                        </Alert>
                    </div>
                </Snackbar>
            </ThemeProvider>
        </div>
    );

}
