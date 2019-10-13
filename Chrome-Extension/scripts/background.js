chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Add note",
        "id": "ADD_NOTE",
        "contexts": ["selection"]
    });
});

selections = [];

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    selections.push(info.selectionText);
    /* Requests
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            msg: "note",
            data: {
                selection: info.selectionText
            }
        });
    });
     */
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            msg: "comment",
            data: {
                selection: info.selectionText
            }
        });
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "tick") {
            chrome.runtime.sendMessage({
                msg: "tock",
                data: {
                    selections: selections
                }
            });
        }
    }
);

function getServerData() {
    fetch("http://127.0.0.1/fetchtest")
        .then(function (response) {
            return response.text();
    })
        .then(function (text) {
            console.log(text);
        });
}