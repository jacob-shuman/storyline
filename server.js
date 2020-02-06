const express = require("express");
const app = express();
const path = require("path");
// const hostname = '10.102.112.181';
const PORT = 10034;

const credentials = {
  key: fs.readFileSync("ssl/key.key").toString(),
  cert: fs.readFileSync("ssl/cert.key").toString()
};

app.use(express.static(path.join(__dirname, "dist", "storyline")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "storyline", "index.html"));
});

app.get("/ping", (req, res) => {
  res.status(200).send("Working!");
});

// require("http")
//   .createServer(app)
//   .listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });

require("https")
  .createServer(credentials, app)
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
