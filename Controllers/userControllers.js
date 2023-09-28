const User = require('../Models/userModel')
const bcrypt = require("bcrypt")

const userController = {
    signUp : async (req,res) => {
        try {
            let {email,password,name} = req.body
            
            const user = await User.findOne({email})

            if(user) return res.status(400).json({msg:"Email already exist..."})

            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password,salt)

            const newUser = await User.create({email,password,name})

            res.status(200).json(newUser)

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = userController