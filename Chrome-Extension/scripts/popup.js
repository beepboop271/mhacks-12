let mainArea = document.getElementById("mainContent");
chrome.runtime.sendMessage({
    msg: "tick"
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "tock") {
          for (let i = 0; i < request.data.selections.length; i++) {
              console.log("msg");
              let p = document.createElement("P");
              p.textContent = request.data.selections[i];
              mainArea.appendChild(p);
          }

      }
  }
);