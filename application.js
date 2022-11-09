//BACKEND

const bcrypt = require("bcryptjs"); /* for hashing user password */
const jwt = require("jsonwebtoken"); /* use to assign dynamic token when user logs in */
const uuid = require("uuid"); /* use to generate random IDs */
const secretKey = "chineseChikki";

// DATABASE IMPORTATION
const { Database } = require("./dB");

//main signup handler function
function handleSignup(req, res) {
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashedPassword;
  req.body.id = uuid.v4();
  Database.users.push(req.body);
  res.status(201).json({ status: true, message: "User Created" });
}

//main Login handler function
function handleLogin(req, res) {
  //getting the user ID from user Exists MIDDLEWARE
  let userID = res.locals.id;
  let token = jwt.sign({ userID }, secretKey, { expiresIn: "2d" });
  res
    .status(201)
    .json({ status: true, message: "User Logged in successfully", token });
}

//FNX TO HANDLE GET REQUEST FROM USER
function getUser(req, res) {
  let auth = req.headers.authorization;
  try {
    let token = jwt.verify(auth, secretKey);
    let userId = token.userID;
    let user = Database.users.filter((user) => user.id == userId);
    res.status(200).json({ status: true, message: user[0] });
  } catch (error) {
    res.status(401).json({ status: false, message: error });
  }
}

module.exports = { handleSignup, handleLogin, getUser };
