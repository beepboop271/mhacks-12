const socket = io();

socket.on("welcome", (msg) => {
  document.getElementById("messages").innerHTML = "WELCOME";
});

socket.on("parsedData", (data) => {
  document.getElementById("messages").innerHTML = data;
});
