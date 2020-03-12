const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://myvmlab.senecacollege.ca:6912/Storyline"; // Use this when running locally
// const mongoUrl = "mongodb://localhost:10016/Storyline"; // Use this when running on the VM
const db = mongoose.connection;
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')

let User;
let Project;
const EMAIL_SECRET = 'TBhYcCcYvDZq9iP8lxwHsdu09123nlasdasdf';

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
      if(user.Authenticated) {return user;} else {throw "Account is not authenticated";}
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
              } else 
                {
                  let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: "weslieistesting@gmail.com",
                      pass: "Some1234"
                    }
                  });

                  try {
                    //using jwt to generate a unique link
                    const emailToken = jwt.sign(
                      {User: newUser._id},
                      EMAIL_SECRET,
                      {expiresIn: '2d',}
                    );

                    //for debugging
                    //console.log('emailToken: ' + emailToken);
  
                    //use one of the following links depending on the enviornment
                    //const url = `https://prj666.mystudentlab.ca:6914/confirmation/${emailToken}`;
                    const url = `http://localhost:10040/confirmation/${emailToken}`;
  
                    // send mail with defined transport object
                    transporter.sendMail({
                      from: "Storyline", // sender address
                      to: email, // list of receivers
                      subject: "Welcome to Storyline 📚🖊️", // Subject line
                      text: `Welcome to Storyline, please click on the following link to activate your account: <a href="${url}">${url}</a>`, // plain text body
                      html: `<b>Welcome to Storyline, please click on the following link to activate your account: <a href="${url}">${url}</a>` // html body
                      });
  
                      } catch (e) {
                      reject("Email Error: " + e);
                    }
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

module.exports.getUser = async function(_id) {
  try {
    const user = await User.findOne({ _id }).exec();

    if (!user) {
      throw "Invalid ID";
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

//does nothing
module.exports.getAuthenticated = async function(User_email) {

  try {
    const user = await User.findOne({ Email: User_email }).exec();

    if (!user) {
      throw "User does not exist!";
    }

    if (user.Authenticated){
      throw "User does not exist!";
    }

    user.Authenticated = true;
  } catch (err) {
    throw err;
  }

};

//does nothing
module.exports.getJTWConfirmed = function(req){
  try {
    console.log('step 1');
    //const {_id: user._id} = jwt.verify(req.params.token, EMAIL_SECRET);
    console.log('step 2');
    //await models.User.update();
    console.log('step 3');
  } catch (e) {
      console.log('step 4');
      res.send('error: ' + e);
    }
}

//Takes in a user id, and a body of text and sends the devs(us) an email containing the user's email and their feedback
//Per Business rules, users are only allowed to send a feeback once a day (24 hours), and that is kept track by one of our user's attributes
module.exports.sendFeedback = function(_id, body){
  const user;
  try {
    user = await User.findOne({ _id }).exec();
    if (!user) {
      throw "User cannot be found";
    }
  } catch (err) {
    throw err;
  }
  //getting the dates
  var now = new Date();
  now.getTime();
  var then = new Date(user.Last_Feedback);
  //calculating the difference in days, as getTime() returns milliseconds, a division of multiplications is applied 
  var difference = (now.getTime() - then.getTime()/(1000 * 60 * 60 * 24));

  if (user.Last_Feedback == null || difference >= 1)
  {
    try{
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "weslieistesting@gmail.com",
          pass: "Some1234"
        }
      });
      // send mail with defined transport object
      transporter.sendMail({
        from: "Storyline Feedback", // sender address
        to: email,                                      // list of receivers
        subject: "Feedback 📚🖊️",                      // Subject line
        text: user.email + body,                                     // plain text body
        html: '<b>{body}</b>'                            // html body
      });

    } catch (e) {
      reject("Feedback Email Error: " + e);
    }
  }
  //todo update user's last feedback attempt
}