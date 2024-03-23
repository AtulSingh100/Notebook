const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');  //Destructuring Objects
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Atulisagoodb$oy'

// ROUTE 1: Create a User(Signup) using : POST "api/auth/createuser". No Login Required
router.post('/createuser', [ //Below line of three code is for express-validator
  body('name', 'Enter a valid Name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password should be atleast 5 Characters').isLength({ min: 2 })
], async (req, res) => {
  let success = false;
  //If there are errors,return bad Request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //Check wheter the user with the email exists Already 
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({success,  error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10); //Wherever there is promise return use await
    const securePassword = await bcrypt.hash(req.body.password, salt); //Promise return(Pause) write their await   
    //Create a new User
    user = await User.create({  //Check wheter there will be let before user or not
      name: req.body.name,
      password: securePassword,
      email: req.body.email,
    });
    const data = {   //Here we have written data which is also known as Payload 
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    success = true;
    res.json({ success,  authtoken })

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Error has Occured")
  }
})

// ROUTE 2 : Login(Authenticate) a user using: POST "/api/auth/login" . No Login Required
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password Cannot be blanked').exists()
], async (req, res) => {
  let success = false;
  //If there are errors,return bad Request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success = false;
      return res.status(400).json({ error: "Please Try to Login with Correct Crediantials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please Try to Login with Correct Crediantials" });
    }

    const data = {             //Here we have written data which is also known as Payload 
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success,authtoken })



  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Errored")
  }


})


// ROUTE 3: Get loggedin User Deatils using : POST "/api/auth/getuser". Login Required
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Errored")
  }
})


module.exports = router 