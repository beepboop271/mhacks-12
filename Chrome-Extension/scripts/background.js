chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Test parent item",
        "id": "TEST",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    alert(info.selectionText);
    getServerData();
});


function getServerData() {
    fetch("http://127.0.0.1/fetchtest")

        .then(function (response) {
            return response.text();
    })
        .then(function (text) {
            console.log(text);
        });
}