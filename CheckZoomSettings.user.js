// ==UserScript==
// @name         CheckZoomSettings
// @namespace    https://github.com/BlazerYoo/
// @version      0.3
// @description  Check Zoom settings for any changes
// @author       You
// @match        http*://*.zoom.us/profile/setting*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener("load", () => {
        addButton("Current settings");
        addButton("Compare");
    });

    function addButton(text, onclick, cssObj) {
        let button = document.createElement("button"),
            btnStyle = button.style;
        document.body.appendChild(button);
        button.innerHTML = text;
        if (text == "Current settings") {
            cssObj = cssObj || {
                position: "fixed",
                top: "2%",
                right: "60%",
                "z-index": 1000000,
                fontSize: "20px",
                backgroundColor: "#FF002E",
                color: "white",
                border: "2px solid black",
                borderColor: "#FF002E",
                borderRadius: "5px",
                padding: "7px 15px"
            };
            button.onclick = current;
        } else {
            cssObj = cssObj || {
                position: "fixed",
                top: "2%",
                right: "50%",
                "z-index": 1000000,
                fontSize: "20px",
                backgroundColor: "#FF002E",
                color: "white",
                border: "2px solid black",
                borderColor: "#FF002E",
                borderRadius: "5px",
                padding: "7px 15px"
            };
            button.onclick = compare;
        }
        Object.keys(cssObj).forEach(key => (btnStyle[key] = cssObj[key]));
        return button;
    }

    function current() {
        let features = document.getElementsByClassName("feature-toggle-wrap");
        let settings = {};
        for (let feature of features) {
            let s;
            s = feature.innerHTML.substring(feature.innerHTML.indexOf("aria-label") + 12,
                                            feature.innerHTML.indexOf("\"", feature.innerHTML.indexOf("aria-label") + 12))
            if (feature.innerHTML.indexOf("is-checked") == -1) {
                settings[s] = "OFF";
            } else {
                settings[s] = "ON";
            }
        }
        console.log(JSON.stringify(settings));
        return settings;
    }

    function compare() {
        console.log("COMPARING...");
        let settings = current();
        let originalSettings = {"SETTINGS_JSON":"OFF"};
        let settingsKeys = Object.keys(settings);
        let originalSettingsKeys = Object.keys(originalSettings);
        if (settingsKeys.length !== originalSettingsKeys.length) {
            console.log(false);
            alert("The settings do not match! The number of settings is different.")
            return false
        }
        for (let key of originalSettingsKeys) {
            if (originalSettings[key] !== settings[key]) {
                console.log(false);
                alert("The settings do not match!\nIn the original settings,\n\"" +
                      key + "\"\nis\n       " + originalSettings[key] + "\nbut in the current settings\n\"" +
                      key + "\"\nis\n       " + settings[key]);
                return false
            }
        }
        console.log(true);
        alert("The settings match ;)")
        return true
    }
})();
