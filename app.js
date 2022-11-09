//IMPORTATION OF MODULES
const express = require("express");
const app = express();
const cors = require("cors"); /* for allowing cross platform request */
const port = 7980;

//SETTING UP BASIC MIDDLE-WEARS(BODY PARSER)
app.use(express.json()); //json payload request
app.use(express.urlencoded({ extended: true })); //urlencoded payload request
app.use(cors()); //for cross platform request

//CUSTOM MIDDLEWARE MODULE IMPORTATION
const { emptyString } = require("./middleWares/emptyString");
const { userExist } = require("./middleWares/UserExists");
// const checkPass = require("./middleWares/confirmPassword");

// DESTRUCTURING OF OBJECTS(importation of module)
const { handleSignup, handleLogin, getUser } = require("./application");
// handling user signup request
app.post("/user/signup", emptyString, userExist, handleSignup);

// handling user login request
app.post("/user/login", emptyString, userExist, handleLogin);

// handling user get request
app.get("/user", getUser);

// handler for starting up server
app.listen(port, () => console.log(`server running at port.... ${port}`));
