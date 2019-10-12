const em = require("./app.js");

em.on("newData", (ref) => {
  ref.on("value", (snapshot) => {
    snapshot.forEach((child) => {
      console.log(child.val());
    });
  });
});
