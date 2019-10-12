chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Add note",
        "id": "ADD_NOTE",
        "contexts": ["selection"]
    });
});

selections = [];

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    //alert(info.selectionText);
    selections.push(info.selectionText);
    getServerData();
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