console.log("ASDASDASD");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "note") {
            console.log(request.phrase);
            let name = window.location.hostname.replace(/\./g, "-");
            let projectName = "first-project";


            postNoteData({
                path: projectName + "***" + name,
                phrase: request.data.selection,
                index: 0,
                comment: "no comment",
                url: window.location.href
            });
        } else if (request.msg === "comment") {
            let userSelection = window.getSelection().getRangeAt(0);

            let nodeData = userSelection.startContainer;
            console.log(userSelection.startOffset);
            console.log(userSelection.endOffset);
            console.log(nodeData.textContent);
            console.log(nodeData.parentElement.innerHTML);
            console.log(nodeData.parentElement.tagName);

            let comment = prompt("Enter a note");
            console.log(comment);

           let safeRanges = getSafeRanges(userSelection);
            for (let i = 0; i < safeRanges.length; i++) {
                highlightRange(safeRanges[i]);
            }


        }
});

function highlightRange(range) {
    var newNode = document.createElement("div");
    newNode.setAttribute(
        "style",
        "background-color: yellow; display: inline;"
    );
    range.surroundContents(newNode);
}

function postNoteData(data) {
    fetch("http://127.0.0.1/new/note", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function getSafeRanges(dangerous) {
    let a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    let s = new Array(0);
    let rs = new Array(0);
    if (dangerous.startContainer != a) {
        for (let i = dangerous.startContainer; i != a; i = i.parentNode) {
            s.push(i);
        }
    }
    if (0 < s.length) {
        for (let i = 0; i < s.length; i++) {
            let xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i - 1]);
                xs.setEndAfter(s[i].lastChild);
            } else {
                xs.setStart(s[i], dangerous.startOffset);
                xs.setEndAfter((s[i].nodeType == Node.TEXT_NODE) ? s[i] : s[i].lastChild);
            }
            rs.push(xs);
        }
    }

    // Ends -- basically the same code reversed
    let e = new Array(0);
    let re = new Array(0);
    if (dangerous.endContainer != a)
        for (var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i);
    if (0 < e.length) {
        for (let i = 0; i < e.length; i++) {
            let xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i - 1]);
            } else {
                xe.setStartBefore((e[i].nodeType == Node.TEXT_NODE) ? e[i] : e[i].firstChild);
                xe.setEnd(e[i], dangerous.endOffset);
            }
            re.unshift(xe);
        }
    }

    // Middle -- the uncaptured middle
    if ((0 < s.length) && (0 < e.length)) {
        let xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
        rs.concat(getSafeRanges(xm));
        console.log(xm);
    } else {
        return [dangerous];
    }

    // Concat

    let response = rs.concat(re);

    // Send to Console
    return response;
}