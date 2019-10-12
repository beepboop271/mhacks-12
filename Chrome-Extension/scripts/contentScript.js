console.log("ASDASDASD");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "note") {
            let name = window.location.hostname;
            name = name.substr(name.indexOf("www.") + 4);
            name = name.substr(0, name.indexOf("."));
             postNoteData({
                path: "kill-me." + name,
                phrase: request.data.selection,
                index: 0,
                comment: "no comment"
            });
        }
});

function postNoteData(data) {
    fetch("http://127.0.0.1/new/note", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}