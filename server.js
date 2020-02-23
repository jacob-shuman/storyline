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
    // TODO: check that this user is the same user signed in...
    const user = await dbManager.getUser(req.params.id);

    if (!user) {
      throw `Couldn't find a user with an id of ${req.params.id}`;
    }

    const projects = await dbManager.getProjectsByEmail(user.Email);

    res.json({ projects, success: Boolean(projects) });
  } catch (err) {
    console.log("Get Projects Error: ", err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/project/create", async (req, res) => {
  try {
    const project = await dbManager.createProject(
      req.body.email,
      req.body.name,
      req.body.description
    );

    res.json({ project, success: Boolean(project) });
  } catch (err) {
    console.log("Create Project Error: ", err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/project/:id/delete", async (req, res) => {
  try {
    const success = await dbManager.deleteProject(req.params.id);

    res.json({ success });
  } catch (err) {
    console.log("Delete Project Error: ", err);
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
