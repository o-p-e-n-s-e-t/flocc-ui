const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use("/dist", express.static(__dirname + "/dist"));
app.use("/static", express.static(__dirname + "/static"));

app.set("view engine", "ejs");
app.set("views", "./client/pages");

app.get("*", function (req, res) {
  const { path } = req;
  if (path === "/") {
    res.render("index", { path });
  }

  res.render("page", { path });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
