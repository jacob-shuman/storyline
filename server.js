const fs = require("fs");
const path = require("path");

const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 10040;

const dbManager = require("./db-manager");

let credentials;

try {
  credentials = {
    key: fs.readFileSync(path.join(__dirname, "ssl/ssl.key")).toString(),
    cert: fs.readFileSync(path.join(__dirname, "ssl/ssl.crt")).toString()
  };
} catch (err) {
  // SSL Certificate/Key was not found so https is not possible
  console.error("SSL Cert/Key Error: ", err);
}

app.use(require("body-parser").json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist", "storyline")));

app.post("/api/login", async (req, res) => {
  try {
    const user = await dbManager.loginUser(req.body.email, req.body.password);
    let success = false;

    if (user) success = true;

    res.json({ user, success });
  } catch (err) {
    console.log("Login Error: ", err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const result = await dbManager.registerUser(
      req.body.nickname,
      req.body.email,
      req.body.password,
      req.body.securityQuestion,
      req.body.securityAnswer
    );

    res.json({ success: result });
  } catch (err) {
    console.log("Registration Error: ", err);
    res.json({ success: false, error: err });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const projects = await dbManager.getProjects(req.params.id);
    let success;

    if (projects) {
      success = projects
    }

    res.json({ projects, success });
  } catch (err) {
    console.log("Create Project Error: ", err);
    res.json({ success: false, error: err });
  }
});

app.post("/api//project/create", async (req, res) => {
  try {
    const result = await dbManager.createProject(
      req.body.name,
      req.body.description
    );

    res.json({ success: result });
  } catch (err) {
    console.log("Create Project Error: ", err);
    res.json({ success: false, error: err });
  }
});

app.get("/api/ping", (req, res) => {
  res.status(200).send("Working!");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "storyline", "index.html"));
});

dbManager
  .init()
  .then(() => {
    if (credentials)
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
  })
  .catch(err => {
    console.log(err);
  });
