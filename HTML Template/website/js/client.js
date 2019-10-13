const socket = io();

socket.on("welcome", (msg) => {
  document.getElementById("messages").innerHTML = "WELCOME";
});

socket.on("parsedData", (data) => {
  document.getElementById("messages").innerHTML = data;
});

data = {
  "Project 1": {
    "Google" : {
      "-Lr08zBxw8WjjUOYRnvF": {"comments":"no comment","index":0,"phrase":"asd"},
      "-Lr08zBxw8WjHHHhhnvF": {"comments":"Yeet","index":2,"phrase":"asd"},
      "url": "www.google.com"
    },
    "StackOverflow": {
      "-Lr08zBxw8WjeeeeeevF": {"comments":"notttttt","index":0,"phrase":"aeagfojd"},
      "-Lr08zBxJONEGFgrjovF": {"comments":"Despayeeto","index":0,"phrase":"Literally amazing"},
      "url": "www.stackoverflow.com"
    }
  },

  "Project 2": {
    "Google" : {
      "-Lr08zBxw8WjjUOYRnvF": {"comments":"no comment","index":0,"phrase":"asd"},
      "-Lr08zBxw8WjHHHhhnvF": {"comments":"Yeet","index":2,"phrase":"asd"},
      "url": "www.google.com"
    },
    "StackOverflow": {
      "-Lr08zBxw8WjeeeeeevF": {"comments":"notttttt","index":0,"phrase":"aeagfojd"},
      "-Lr08zBxJONEGFgrjovF": {"comments":"Despayeeto","index":0,"phrase":"Literally amazing"},
      "url": "www.stackoverflow.com"
    }
  }
}