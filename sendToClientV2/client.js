const socket = io();

socket.on('welcome', (data) => {
    document.getElementById("messages").innerHTML = data.message;
    socket.emit("client", "JFKJDFKJK");
});

socket.on("test", (data) => {
    document.getElementById("messages").innerHTML = data;
});
