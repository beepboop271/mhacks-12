const em = require("./app.js");

//just logs the data out for now
em.on("newData", (ref) => {
  ref.on("value", (snapshot) => {
    snapshot.forEach((child) => {
      console.log(child.val());
    });
  });
});
