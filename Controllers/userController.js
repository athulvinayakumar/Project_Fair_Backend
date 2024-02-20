//  logic to resole the request

// logic
console.log('inside the controller');

// import model
const users = require('../Model/useSchema')

// import jwt
const jwt = require('jsonwebtoken')

// register function
exports.register = async (req, res) => {
    //extract data from request body
    try {
        const { username, email, password } = req.body

        const existingUser = await users.findOne({ email })


        if (existingUser) {
            res.status(406).json("User Already Exists...... Please Login!!!")
        }
        else {
            // register user
            // 1) create a object for the model
            const newUser = new users({
                username,
                email,
                password,
                github: "",
                linkedIn: "",
                profile: ""
            })
            // add to mongodb - use save method in mongoose
            await newUser.save()

            res.status(200).json(newUser)

        }
        // // response
        // res.status(200).json("Registeration request recieved")
        // runtime errors are resolved using try-catch block/*  */

    } catch (err) {
        res.status(401).json(`Register failed due to ${err}`)
    }
}


// login function
exports.login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    try {
        // check user exists
        const existingUser = await users.findOne({ email, password })
        console.log(existingUser);
        if (existingUser) {
            // jwt
            // payload - is the secret information that is transmitted
            // secret key - key based on which the token is generated
            const token = jwt.sign({ userId: existingUser._id }, "superSecretKey12345")

            // sending an object becus we are sending more data
            res.status(200).json({
                existingUser,
                token
            })
        }
        else {
            res.status(404).json("Incorrect email/password")
        }
    }
    catch (err) {
        res.status(401).json(`Login request failed due to:${err}`)
    }

}

// edit profile
exports.edituser = async (req, res) => {
    const userId = req.payload
    const { username, email, password, github, linkedIn, profile } = req.body

    const profileImage = req.file ? req.file.filename : profile

    try {
        const updateUser = await users.findByIdAndUpdate({ _id: userId }, {
            username,
            email,
            password,
            github,
            linkedIn,
            profile: profileImage

        }, { new: true })

        await updateUser.save()
        res.status(200).json(updateUser)

    } catch (err) {
        res.status(401).json(err)
    }

}


