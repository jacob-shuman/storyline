const fs = require("fs");
const path = require("path");

const cors = require("cors");
const express = require("express");
const app = express();
// const hostname = '10.102.112.181';
const PORT = 10034;

let credentials;
let secure = true;

try {
  credentials = {
    key: fs.readFileSync(path.join(__dirname, "ssl/ssl.key")).toString(),
    cert: fs.readFileSync(path.join(__dirname, "ssl/ssl.crt")).toString()
  };
} catch (err) {
  // SSL Certificate/Key was not found so https is not possible
  if (err.code === "ENOENT") secure = false;
}

app.use(require("body-parser").json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist", "storyline")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "storyline", "index.html"));
});

app.post("/login", (req, res) => {
  // Compare against database

  console.log(req.body);

  res.json({success: true});
});

app.get("/ping", (req, res) => {
  res.status(200).send("Working!");
});

if (secure)
  require("https")
    .createServer(credentials, app)
    .listen(PORT, () => {
      console.log(`Server running on port ${PORT} using https`);
    });
else
  require("http")
    .createServer(app)
    .listen(PORT, () => {
      console.log(`Server running on port ${PORT} using http`);
    });
