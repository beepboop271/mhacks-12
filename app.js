const firebase = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
//const cors = require("cors");
const events = require("events");
const test = require("./HTML Template/js/test");
var data = {
  "project1": {
    "-Lr2OjfmmSZolcm8cs5u": { "initial": "value" },
    "google": {
      "-Lr2PyMZ5nB067Wt7CVQ": {
        "comments": "hi",
        "index": "6",
        "phrase": "lol",
        "url": "www.google.com"
      },
      "-Lr2Q2P-qYYsDNUCFC8a": {
        "comments": "hi",
        "index": "6",
        "phrase": "lol",
        "url": "www.google234.com"
      }
    },
    "wikipedia": {
      "-Lr2Q132zqx_3A8u8056": {
        "comments": "hi",
        "index": "6",
        "phrase": "lol",
        "url": "www.google.com"
      }
    }
  },
  "project2": { "-Lr2Q7-BK_BcnfmRH2-K": { "initial": "value" } }
};


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
  let kms = "";
  let newData = {};
  newData.projects = [];
  //newData = setKV(newData, data);
  //console.log(JSON.stringify(data));
  //console.log(JSON.parse(JSON.stringify(data)));
  //console.log(data["project1"]["google"]["-Lr2PyMZ5nB067Wt7CVQ"]);
  for (let projectName of Object.keys(data)) {
    //console.log(data[projectName]["google"]["-Lr2PyMZ5nB067Wt7CVQ"]);
    kms += "<h3>" + projectName + "</h3>";
    for (let websiteName of Object.keys(data[projectName])) {
      kms += "<h4>" + websiteName + "</h4>";
      for (let misc of Object.keys(data[projectName][websiteName])) {
        if (typeof data[projectName][websiteName][misc] === "object") {
          for (let [bs, moreBS] of Object.entries(data[projectName][websiteName][misc])) {
            console.log(data[projectName][websiteName][misc][bs]);
            kms += "<p>" + bs + ": " + moreBS + "<p/>";
          }
        } else {
          kms += "<h5>" + misc + "</h5>";
          kms += data[projectName][websiteName][misc];
        }
      }
    }
  }

  res.render('HTML Template/webpage', {lolXD: kms});
});

function setKV(outputSource, dataSource) {
  for (let[key, value] of Object.entries(dataSource)) {
    if (typeof dataSource[key] === 'object') {
      outputSource[key] = setKV(outputSource[key], dataSource[key]);
    } else {
      outputSource[key] = value;
    }
  }
  return outputSource;
}

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
