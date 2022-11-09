let bcrypt = require("bcryptjs");
//DATABASE IMPORTATION
const { Database } = require("../dB");
// MIDDLEWARE FNX TO VERIFY IF USER ALREADY EXISTS IN THE DATABASE

function userExist(req, res, next) {
  let { email, password } = req.body; // DESTRUCTURING REQ.BODY OBJECT
  let alreadyUser = Database.users.filter((user) => user.email == email);

  if (req.path == "/user/signup") {
    if (alreadyUser.length > 0) {
      res.status(400).json({ status: false, message: "User already Exists" });
    } else {
      next();
    }
  } else if (req.path == "/user/login") {
    if (alreadyUser.length > 0) {
      let unHashedPwd = bcrypt.compareSync(password, alreadyUser[0].password);
      if (unHashedPwd) {
        res.locals.id = alreadyUser[0].id;
        next();
      } else {
        res
          .status(400)
          .json({ status: false, message: "User password/ Email mismatched" });
      }
    } else {
      res.status(409).json({ status: false, message: "User does not Exist" });
    }
  }
}

module.exports = { userExist };
