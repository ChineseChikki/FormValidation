// MIDDLEWARE FNX TO VERIFY THAT USER INPUTS ALL REQUIRED FIELDS
function emptyString(req, res, next) {
  let errors = []; //array to hold errors
  //ARRAY TO HOLD REQUIRED FIELDS
  let requiredFields = [];
  if (req.path == "/user/signup") {
    requiredFields = ["firstName", "email", "password"];
  } else if (req.path == "/user/login") {
    requiredFields = ["email", "password"];
  }

  //OBJECT DESTRUCTURING OF REQ.BODY
  let { firstName, lastName, email, password } = req.body;
  if (!firstName && requiredFields.includes("firstName")) {
    errors.push("firstName is required");
  }
  if (!lastName && requiredFields.includes("lastName")) {
    errors.push("lastName is required");
  }
  if (!password && requiredFields.includes("password")) {
    errors.push("password is required");
  }
  if (!email && requiredFields.includes("email")) {
    errors.push("email is required");
  }
  if (email) {
    let regEx = /^[^0-9][a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
    if (!regEx.test(email)) {
      errors.push("wrong email format");
    }
  }
  if (errors.length > 0) {
    res.status(400).json({ status: false, message: errors.join(",") });
  } else {
    next();
  }
}

module.exports = { emptyString };
