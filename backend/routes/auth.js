const express = require('express')
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'P@U#N$I%T';
const router = express.Router();


// Route 1: 
// Sign up User /api/auth/createuser
router.post('/createuser', [
    body('password', 'Enter valid pass').isLength({ min: 5 }),
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {


        // check user exist already
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).json({ msg: 'User with this email already exist' })
        }

        let salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            usertoken: {
                id: user.id
            }
        }

        // generating AuthToken for JWT Authentication
        const authToken = jwt.sign(data, JWT_SECRET);

        // sending AuthToken in Response to user
        res.json({ authToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Route 2: 
// Authenticating User /api/auth/login
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter Valid Password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({ msg: 'Please Enter Correct Credentials !!!' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ msg: 'Please Enter Correct Credentials !!!' });
        }

        const data = {
            usertoken: {
                id: user.id
            }
        }

        // generating AuthToken for JWT Authentication
        const authToken = jwt.sign(data, JWT_SECRET);

        // sending AuthToken in Response to user
        res.json({ authToken });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Route 3: 
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router