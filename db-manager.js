const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://myvmlab.senecacollege.ca:6912/Storyline"; // Use this when running locally
// const mongoUrl = "mongodb://localhost:10016/Storyline"; // Use this when running on the VM
const db = mongoose.connection;

let User;
let Project;

module.exports.init = function() {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", err => {
      reject(err);
    });

    db.once("open", () => {
      User = mongoose.model(
        "User",
        new mongoose.Schema({
          Email: String,
          Password: String,
          Nickname: String,
          Security_Question: Number,
          Security_Answer: String,
          Last_Failed_Login: String,
          Last_Feedback: String,
          User_Settings: String,
          Authenticated: Boolean
        }),
        "users"
      );

      Project = mongoose.model(
        "Project",
        new mongoose.Schema({
          Name: String,
          Description: String,
          Time_Format: String,
          Archived: Number,
          Countdown: String,
          User_email: String
        }),
        "projects"
      );

      resolve();
    });
  });
};

module.exports.loginUser = async function(email, password) {
  try {
    const user = await User.findOne({ Email: email }).exec();
    if (!user) {
      throw "Invalid Email/Password combination";
    }

    if (await bcrypt.compare(password, user.Password)) {
      return user;
    } else {
      // TODO: update user's Last_Failed_Login field

      throw "Invalid Email/Password combination";
    }
  } catch (err) {
    throw err;
  }
};

module.exports.registerUser = function(
  nickName,
  email,
  password,
  securityQuestion,
  securityAnswer
) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10).then(pass => {
      const hashedPassword = pass;

      const newUser = new User({
        Email: email,
        Password: hashedPassword,
        Nickname: nickName,
        Security_Question: securityQuestion,
        Security_Answer: securityAnswer,
        Last_Failed_Login: "00:00:00",
        Last_Feedback: "00:00:00",
        User_Settings: "1,1,1,1,1",
        Authenticated: false
      });

      User.findOne({ Email: email })
        .exec()
        .then(user => {
          if (!user) {
            newUser.save(function(err, user) {
              if (err) {
                reject("Mongo Save Error: " + err);
              } else {
                resolve(true);
              }
            });
          } else {
            reject("User with that email already exists");
          }
        });
    });
  });
};

module.exports.updateNickname = async function(Email, Nickname) {
  try {
    const user = await User.findOne({ Email }).exec();

    if (!user) {
      throw "Invalid Email";
    }

    // if (await bcrypt.compare(password, user.Password)) {
    user.Nickname = Nickname;

    user.save(function(err, user) {
      if (err) {
        throw "Mongo Save Error: " + err;
      } else {
        return true;
      }
    });
  } catch (err) {
    throw err;
  }
};

module.exports.updatePassword = async function(_id, oldPassword, newPassword) {
  try {
    const user = await User.findOne({ _id }).exec();

    if (await bcrypt.compare(password, user.Password)) {
      let password = await bcrypt.hash(password, 10);

      user.save(function(err, user) {
        if (err) {
          throw "Mongo Save Error: " + err;
        } else {
          return password;
        }
      });
    } else {
      throw "Passwords don't match";
    }
  } catch (err) {
    throw err;
  }
};

module.exports.updateProject = async function(_id, Name, Description) {
  try {
    const project = await Project.findOne({ _id }).exec();

    if (!project) throw "Invalid Project ID";

    project.Name = Name;
    project.Description = Description;

    return await project.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getUser = async function(_id, Password) {
  try {
    const user = await User.findOne({ _id, Password }).exec();

    if (!user) {
      throw "Invalid ID/Password";
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.createProject = async function(User_email, Name, Description) {
  try {
    const projects = await Project.find({ Name }).exec();

    if (projects && projects.length > 0) {
      throw "Project name already exists";
    }

    const project = await new Project({
      Name,
      Description,
      Time_Format: "normal",
      Archived: false,
      Countdown: "30",
      User_email
    }).save();

    return project;
  } catch (err) {
    throw err;
  }
};

module.exports.getProjectsByEmail = async function(User_email) {
  try {
    const projects = await Project.find({ User_email }).exec();

    if (!projects) {
      throw "Invalid Email";
    }

    return projects;
  } catch (err) {
    throw err;
  }
};

module.exports.archiveProject = async function(_id, archived) {
  try {
    const project = await Project.findOne({ _id }).exec();

    if (!project) {
      throw "Invalid ID";
    }

    project.Archived = archived;
    await project.save();

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteProject = async function(_id) {
  try {
    const result = await Project.deleteOne({ _id }).exec();

    if (!result > 0) {
      throw "Invalid ID";
    }

    return true;
  } catch (err) {
    throw err;
  }
};
