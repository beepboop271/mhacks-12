const firebase = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
//const cors = require("cors");
const events = require("events");
const test = require("./HTML Template/js/test");
var data = {"kill-me":{"google":{"-Lr08zBxw8WjjUOYRnvF":{"comments":"nocomment","index":0,"phrase":"asd"},"url":"tffest"},"hub":{"-Lr0BRwy769DvPitKkhr":{"comments":"nocomment","index":0,"phrase":"CheckoutourQuickstarttutorialsforeachproduct-fast5-10minutetutorialstogetyouupandrunningwithyourfirstAPIcallordeployment.Ontheleftnavigationbarforeachproductdocumentationpage,wehavelinkstoothertutorials."},"-Lr0BSceqddgUr8pWSWD":{"comments":"nocomment","index":0,"phrase":"WhatproductsshouldItry?"},"-Lr0BUdd7py_GibYCXAW":{"comments":"nocomment","index":0,"phrase":"WhatisGoogleCloud?GoogleCloudisasuiteofdeveloper"},"url":"teffst"}},"project1":{"Google":{"-Lr-8Vn3RMiQSWUd2zEn":{"comments":"thisisacomment","index":"123","phrase":"hi"},"-Lr-8Vn7g0g8By4sk-uV":{"comments":"wow","index":"1","phrase":"hello"},"url":"thisisaurl"},"asdf":{"-Lr-gffppIldwaqVpNTs":{"comments":"aasfdasdfasd","index":"a","phrase":"b"},"-Lr0B3Ub2wFHoF0xeZLt":{"comments":"h","index":"i","phrase":"hi"},"-Lr0BxjinDaV2v8OgZbl":{"comments":"h","index":"i","phrase":"hi"},"-Lr0CLVWwS9avu_uBPTD":{"comments":"h","index":"i","phrase":"hi"},"-Lr0CPSvIsyQ3tHSBXUT":{"comments":"h","index":"i","phrase":"hi"},"url":"teffst"},"wikipedia":{"-Lr029kTsNMm9_o_SYK6":{"comments":"hi","index":"1","phrase":"hi"},"-Lr0DXjvwp4dC-8w4Gx-":{"comments":"h","index":"i","phrase":"hi"},"url":"tffest"}},"project2":{"wikipedia":{"-Lr-BNBLsUjS4H4ImFiG":{"comments":"","index":"7","phrase":"importanatsentence"},"url":"url1"}}}


const em = new events.EventEmitter();

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
app.use(express.static('HTML Template'));
app.set('view engine', 'html');
app.set('views', '');
//app.use(cors);

app.get('/webpage', (req, res) => {
  console.log(data);
  console.log();
  let newData = {};
  let projects = Object.keys(data);
  newData.projects = [];
  for (var [key, value] in Object.entries(data)) {
    console.log(key + ": " + value);
  }

  console.log(newData.projects);

  res.render('HTML Template/webpage', {data: data, projects: projects});
});

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
  console.log("Launched on port 80");
});

app.post("/new/project", (req, res) => {
  pushProject(getReferenceFromPath(req.body.path));
  res.end("yes");
});

app.post("/new/note", (req, res) => {
    console.log(req.body);
    /*
  getReferenceFromPath(req.body.path).child("url").on("value", (snapshot) => {
    /*
      if(!snapshot.val()) {
      getReferenceFromPath(req.body.path).update({"url":req.body.url});
    }

  });

     */
  pushData(getReferenceFromPath(req.body.path),
           req.body.phrase,
           req.body.index,
           req.body.comment,
           req.body.url);
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
  path = path.split("***");
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

function pushData(path, phrase, index, comment, url) {
  path.push({
    phrase: phrase,
    index: index,
    comments: comment,
    url: url
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
