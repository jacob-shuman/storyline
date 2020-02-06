const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();
// const hostname = '10.102.112.181';
const PORT = 10034;

const credentials = {
  key: fs.readFileSync(path.join(__dirname, "ssl/ssl.key")).toString(),
  cert: fs.readFileSync(path.join(__dirname, "ssl/ssl.crt")).toString()
};

app.use(express.static(path.join(__dirname, "dist", "storyline")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "storyline", "index.html"));
});

app.get("/ping", (req, res) => {
  res.status(200).send("Working!");
});

require("https")
  .createServer(credentials, app)
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });