const firebase = require("firebase-admin");

const serviceAccount = require("./mhacks12-218b0-firebase-adminsdk-s760b-8a5fef7609.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://mhacks12-218b0.firebaseio.com"
});

const db = firebase.database();
const user = db.ref("user");


function pushData(path, phrase, index, comment) {
  path.update({
    phrase: phrase,
    index: index,
    comments: comment
  });
}

function pushProject(path, name) {
  path.update({name: name});
}

function pushWebpage(path, url) {
  path.update({url: url});
}

//will be change later depending on how the file is received
let projectName = "project1";
let webpage = "Google";
let dataId = "data1";
let url = "this is a url";
let phrase = "hi";
let index = "123";
let comment = "this is a comment";

pushWebpage(user.child(projectName)
                .child(webpage), url);
pushData(user.child(projectName)
             .child(webpage)
             .child(dataId), phrase, index, comment);
