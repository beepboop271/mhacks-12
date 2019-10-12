chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Test parent item",
        "id": "TEST",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    alert(info.selectionText);

});