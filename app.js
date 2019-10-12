const firebase = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const events = require("events");

const em = new events.EventEmitter();

const serviceAccount = require("./auth.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://mhacks12-218b0.firebaseio.com"
});

const db = firebase.database();
const user = db.ref("user1");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(80, () => {
  console.log("Launched on port 80");
});

app.post("/new/project", (req, res) => {
  pushProject(getReferenceFromPath(req.body.path));
  res.end("yes");
});
app.post("/new/note", (req, res) => {
  getReferenceFromPath(req.body.path).child("url").on("value", (snapshot) => {
    if(!snapshot.val()) {
      getReferenceFromPath(req.body.path).update({"url":req.body.url});
    }
  });
  pushData(getReferenceFromPath(req.body.path),
           req.body.phrase,
           req.body.index,
           req.body.comment);
  res.end("yes");
});

app.post("/edit", (req, res) => {
  updateComment(getReferenceFromPath(req.body.path),
                req.body.comment);
  res.end("yes");
});

app.post("/remove", (req, res) => {
  removePath(getReferenceFromPath(req.body.path));
  res.end("yes");
});

function getReferenceFromPath(path) {
  path = path.split(".");
  let ref = user;
  for (let i = 0; i < path.length; i++) {
    ref = ref.child(path[i]);
  }
  return ref;
}

function pushProject(path) {
  path.push({initial:"value"});
  em.emit("update");
}

function pushData(path, phrase, index, comment) {
  path.push({
    phrase: phrase,
    index: index,
    comments: comment
  });
  em.emit("update");
}

function updateComment(path, comment) {
  path.update({
    comments: comment
  });
  em.emit("update");
}

function removePath(path) {
  path.remove();
  em.emit("update");
}


/////handling events => listener functions
//////////////////
em.on("refresh", () => {
  em.emit("update");
});
em.on("update", () => {
  em.emit("newData", user);
});

module.exports = em;






// function pushProject(path, name) {
//   path.update({name: name});
// }


// function pushWebpage(path, url) {
//   path.update({url: url});
// }

//will be change later depending on how the file is received
// let projectName = "project1";
// let webpage = "Google";
// let url = "this is a url";
// let phrase = "hi";
// let index = "123";
// let comment = "this is a comment";

// pushProject("project1");
// pushData()
// pushWebpage(user.child(projectName)
//                 .child(webpage), url);
// pushData(user.child(projectName)
//              .child(webpage), phrase, index, comment);
// pushWebpage(user.child("project2")
//                 .child("wikipedia"), "url2");
// pushData(user.child(projectName)
//              .child(webpage), "hello", "1", "wow");
