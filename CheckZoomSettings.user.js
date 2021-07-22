// ==UserScript==
// @name         CheckZoomSettings
// @namespace    https://github.com/BlazerYoo/
// @version      0.1
// @description  Check Zoom settings for any changes
// @author       You
// @match        https://mcpsmd.zoom.us/profile/setting*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener("load", () => {
        addButton("Current settings");
    });

    function addButton(text, onclick, cssObj) {
        cssObj = cssObj || {
            position: "fixed",
            top: "2%",
            right: "15%",
            "z-index": 1000000,
            fontSize: "20px",
            backgroundColor: "white",
            color: "green",
            border: "2px solid black",
            borderColor: "#4CAF50",
            borderRadius: "5px",
            padding: "7px 15px"
        };
        let button = document.createElement("button"),
            btnStyle = button.style;
        document.body.appendChild(button);
        button.innerHTML = text;
        button.onclick = categories;
        Object.keys(cssObj).forEach(key => (btnStyle[key] = cssObj[key]));
        return button;
    }

    function categories() {
        let features = document.getElementsByClassName("zm-switch");
        for (let feature of features) {
            console.log(feature.innerHTML.substring(feature.innerHTML.indexOf("aria-label") + 11,
                                                    feature.innerHTML.indexOf("\"", feature.innerHTML.indexOf("aria-label") + 12)+1));
        }
    }
})();
