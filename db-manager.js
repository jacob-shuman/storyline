const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://myvmlab.senecacollege.ca:6912/Storyline";
const db = mongoose.connection;

let User;

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
      return true;
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
                console.log("Error: ", err);
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
