// ==UserScript==
// @name         CheckZoomSettings
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
        let originalSettings = {"Require that all meetings are secured with one security option":"OFF","Waiting Room":"ON","Require a passcode when scheduling new meetings":"OFF","Require a passcode for instant meetings":"OFF","Require a passcode for Personal Meeting ID (PMI)":"OFF","Require passcode for participants joining by phone":"OFF","Embed passcode in invite link for one-click join":"ON","Only authenticated users can join meetings":"OFF","Block users in specific domains from joining meetings and webinars":"OFF","Only authenticated users can join meetings from Web client":"OFF","Approve or block entry for users from specific countries/regions":"OFF","Host video":"ON","Participants video":"ON","Allow participants to join before host":"OFF","Allow Zoom Rooms to start meeting with Host Key":"OFF","Enable Personal Meeting ID":"ON","Use Personal Meeting ID (PMI) when scheduling a meeting":"OFF","Use Personal Meeting ID (PMI) when starting an instant meeting":"OFF","Mute all participants when they join a meeting":"OFF","Upcoming meeting reminder":"OFF","Require encryption for 3rd party endpoints (SIP/H.323)":"OFF","Chat":"ON","Private chat":"ON","Auto saving chats":"OFF","Sound notification when someone joins or leaves":"ON","Send files via meeting chat":"ON","Feedback to Zoom":"OFF","Display end-of-meeting experience feedback survey":"OFF","Co-host":"ON","Meeting Polls/Quizzes":"ON","Meeting Survey":"OFF","Always show meeting control toolbar":"ON","Show Zoom windows during screen share":"ON","Screen sharing":"ON","Disable desktop screen sharing for meetings you host":"OFF","Annotation ":"ON","Whiteboard":"ON","Remote control":"OFF","Non-verbal feedback":"ON","Meeting reactions":"ON","Allow removed participants to rejoin":"ON","Allow participants to rename themselves":"ON","Hide participant profile pictures in a meeting":"OFF","Report to Zoom":"ON","Breakout room":"ON","Remote support":"OFF","Closed captioning":"OFF","Save Captions":"OFF","Language Interpretation":"OFF","Far end camera control":"OFF","Virtual background":"ON","Video filters":"ON","Immersive View":"OFF","Focus Mode":"OFF","Identify guest participants in the meeting/webinar":"ON","Auto-answer group in chat":"OFF","Only show default email when sending email invites":"OFF","Use HTML format email for Outlook plugin":"OFF","Allow users to select stereo audio in their client settings":"OFF","Show a &quot;Join from your browser&quot; link":"ON","Show &quot;Always join from browser&quot; option when joining from join.zoom.us":"OFF","Allow livestreaming of meetings":"OFF","Show a custom disclaimer when starting or joining a meeting":"OFF","Request permission to unmute":"ON","When a cloud recording is available":"OFF","When attendees join meeting before host":"OFF","When a meeting is cancelled":"OFF","When an alternative host is set or removed from a meeting":"OFF","When someone scheduled a meeting for a host":"ON","When the cloud recording is going to be permanently deleted from trash":"ON","Blur snapshot on iOS app switcher":"ON","Call a SIP/H.323 room system directly from the client":"OFF"};
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
