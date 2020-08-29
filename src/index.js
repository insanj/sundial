import React from "react";
import ReactDOM from "react-dom";
import SundialApp from "./SundialApp";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <React.StrictMode>
        <SundialApp />
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.register();
