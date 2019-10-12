const firebase = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
//const cors = require("cors");

const serviceAccount = require("./auth.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://mhacks12-218b0.firebaseio.com"
});

const db = firebase.database();
const user = db.ref("user1");

const app = express();
app.engine('html', mustacheExpress());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.set('views', '');
//app.use(cors);

app.get("/fetchtest", (req, res) => {
  console.log("Something tried to fetch");
  res.end("qwasdrgfki");
});

app.get("/viewtest", (req, res) => {
  console.log("Something tried to view");
  res.render('view', {name: "args"});
});

app.get("/viewtest/:args", (req, res) => {
  console.log("Something tried to view");
  res.render('view', {name: req.params.args});
});

app.listen(80, () => {
  console.log("yah yeet");
});

app.post("/new/project", (req, res) => {
  pushProject(getReferenceFromPath(req.body.path));
  res.end("yes");
});
app.post("/new/note", (req, res) => {
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
}

function pushData(path, phrase, index, comment) {
  path.push({
    phrase: phrase,
    index: index,
    comments: comment
  });
}

function updateComment(path, comment) {
  path.update({
    comments: comment
  });
}

function removePath(path) {
  path.remove();
}

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
