// ==UserScript==
// @name         CheckZoomSettings2
// @namespace    https://github.com/BlazerYoo/
// @version      0.2
// @description  Check Zoom settings for any changes
// @author       You
// @match        http*://*.zoom.us/profile/setting*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }
            textFile = window.URL.createObjectURL(data);
            return textFile;
        };

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
            s = feature.getElementsByTagName("span")[1].innerText;
            if (feature.getElementsByTagName("input")[0].getAttribute("aria-pressed") == "true") {
                settings[s] = "ON";
            } else {
                settings[s] = "OFF";
            }
        }
        window.open(makeTextFile(JSON.stringify(settings)));
        return settings;
    }

    function compare() {
        let settings = current();
        let originalSettings = {"SETTINGS_JSON":"OFF"}
        let settingsKeys = Object.keys(settings);
        let originalSettingsKeys = Object.keys(originalSettings);
        if (settingsKeys.length !== originalSettingsKeys.length) {
            alert("The settings do not match! The number of settings is different.")
            return false
        }
        for (let key of originalSettingsKeys) {
            if (originalSettings[key] !== settings[key]) {
                alert("The settings do not match!\nIn the original settings,\n\"" +
                      key + "\"\nis\n       " + originalSettings[key] + "\nbut in the current settings\n\"" +
                      key + "\"\nis\n       " + settings[key]);
                return false
            }
        }
        alert("The settings match ;)")
        return true
    }
})();
