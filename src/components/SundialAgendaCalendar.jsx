import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
    "@keyframes fadeIn": {
        "0%": {
            "opacity": 0
        },
        "100%": {
            "opacity": 1
        }
    },
    "@keyframes scaleUp": {
        "0%": {
            "transform": "scale(0.75, 0.75)"
        },
        "100%": {
            "transform": "scale(1, 1)"
        }
    },

    "root": {
        "zIndex": -1,
        "background": "#424242",
        "height": "60px",
        "minWidth": "250px"
    },
    "legendCell": {
        "paddingTop": 5,
        "paddingBottom": 4,
        "fontSize": "0.8rem",
        "fontFamily": "Lato-Bold",
        "fontWeight": 500,
        "textAlign": "center"
    },
    "table": {
        "width": "100%",
        "tableLayout": "fixed",
        "borderCollapse": "collapse",

        /*
         * BorderLeft: '1px solid rgba(255,255,255,0.2)',
         * BorderRight: '1px solid rgba(255,255,255,0.2)',
         */

        "& > tbody > tr > td": {
            "animation": "$fadeIn 2s ease-in forwards, $scaleUp 2s ease-out forwards"
        },

        "& > tbody > tr > td:nth-child(n+2)": {
            "borderLeft": "1px solid rgba(0,0,0,0.2)"
        },

        "& > tbody > tr > td:nth-child(4)": {
            // Background: 'rgba(94, 53, 177, 0.4)',
            "color": "rgba(220, 231, 117, 1.0)",
            "fontWeight": 700

            /*
             * '& > *:not(:nth-child(n))': {
             *   Background: theme.palette.secondary.main,
             *   Color: '#414241'
             * }
             */
        }

        /*
         * '& > tbody > tr > td:nth-child(3), td:nth-child(5)': {
         *   Background: 'rgba(94, 53, 177, 0.3)',
         * },
         */

        /*
         * '& > tbody > tr > td:nth-child(2), td:nth-child(6)': {
         *   Background: 'rgba(94, 53, 177, 0.2)',
         * },
         */

    /*
     * '& > tbody > tr > td:nth-child(1), td:nth-child(7)': {
     *   background: 'rgba(94, 53, 177, 0.1)',
     * }
     */
    },
    "cell": {
        "cursor": "pointer",
        "textAlign": "center",
        "paddingTop": 2,
        "paddingBottom": 8,
        "paddingLeft": 2,
        "paddingRight": 2,
        "lineHeight": 1.2,
        "fontSize": "0.9rem",

        "transition": "0.2s ease",
        "&:hover": {
            "background": "rgba(94, 53, 177, 0.6) !important"
        }

        /*
         * [theme.breakpoints.down(550)]: {
         *   PaddingLeft: 8,
         *   PaddingRight: 8,
         * },
         */

        /*
         * [theme.breakpoints.down(470)]: {
         *   PaddingLeft: 5,
         *   PaddingRight: 5,
         * },
         */

        /*
         * [theme.breakpoints.down(365)]: {
         *   PaddingLeft: 5,
         *   PaddingRight: 5,
         * },
         */

    /*
     * [theme.breakpoints.down(325)]: {
     *   padding: 5,
     * },
     */
    },
    "cellText": {
        "width": 26,
        "height": 26,
        "paddingTop": 4,
        "borderRadius": 13,
        "marginLeft": "auto",
        "marginRight": "auto",
        "background": "rgba(255,255,255,0.1)"
    },
    "unreadBadge": {
        "position": "absolute",
        "right": 0,
        "top": 0,

        "paddingTop": 2,
        "paddingRight": 0,
        "fontWeight": 500,

        "width": 18,
        "height": 18,
        "borderBottomLeftRadius": 4,

        "overflow": "hidden",

        "fontSize": "0.8rem",
        "color": "#424242",
        "background": theme.palette.secondary.main,

        [theme.breakpoints.down(450)]: {
            "fontSize": "0.7rem",
            "fontWeight": 500,
            "width": 14,
            "height": 14,
            "paddingTop": 0,
            "paddingRight": 0
        }
    }
}));

export default function SundialAgendaCalendar ({selectedDate, datesToUnreadItems, onDateClick}) {

    const classes = useStyles(),

        handleCellClick = (day) => {

            onDateClick(day);

        },

        monthTitle = moment(selectedDate).format("MMMM"),

        /*
         * Const generateArrayOfUnreadItemIds = () => {
         *   If (!datesToUnreadItems) {
         *     Return [];
         *   }
         */

        /*
         *   Let unreadIds = [];
         *   For (let key of Object.keys(datesToUnreadItems)) {
         *     Let array = datesToUnreadItems[key];
         *     Let arrayOfIds = array.map(i => i.id);
         *     UnreadIds = unreadIds.concat(arrayOfIds);
         *   }
         */

        /*
         *   Return unreadIds;
         * }
         */

        // Const unreadItemIds = generateArrayOfUnreadItemIds();

        generateDays = (count = 6) => {

            if (count % 2 !== 0) {

                count -= 1;

            }

            const dayArray = [],
                currentDay = moment(selectedDate);

            // Days before
            for (let i = count / 2; i > 0; i--) {

                const subtracted = currentDay.clone().subtract(
                    i,
                    "days"
                );
                dayArray.push(subtracted);

            }

            dayArray.push(currentDay);

            // Days after
            for (let i = 1; i < count / 2 + 1; i++) {

                const added = currentDay.clone().add(
                    i,
                    "days"
                );
                dayArray.push(added);

            }

            const dayDateArray = dayArray.map((m) => m.toDate());
            return dayDateArray;

        },

        days = generateDays(),
        dayCells = days.map((day) => {

            const dayText = moment(day).format("D"),
                fullDateText = moment(day).format("MMMM Do, YYYY"),
                headerText = moment(day).format("dd").
                    charAt(0);

            let unreadBadge = "";
            if (datesToUnreadItems) {

                const unreadDateFormatDate = moment(day).format("YYYY-MM-DD"),
                    unreadDates = datesToUnreadItems[unreadDateFormatDate];
                if (unreadDates && unreadDates.length > 0) {

                    const unreadCount = unreadDates.length;
                    unreadBadge =
                        (<div className={classes.unreadBadge}>
                        { unreadCount }
                    </div>);

                }

            }

            return (
                <Tooltip
                    arrow
                    title={fullDateText}
                >
                    <td
                        className={classes.cell}
                        onClick={() => handleCellClick(day)}
                    >
                        { unreadBadge }
                        <div className={classes.legendCell}>
                            { headerText }
                        </div>
                        <div className={classes.cellText}>
                            { dayText }
                        </div>
                    </td>
                </Tooltip>
            );

        });

    return (
        <div className={classes.root}>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        { dayCells }
                    </tr>
                </tbody>
            </table>
        </div>
    );

}
