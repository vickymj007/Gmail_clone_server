const User = require('../Models/userModel')
const bcrypt = require("bcrypt")

const userController = {
    showAllUsers : async (req,res)=>{
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
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
    },
    signIn : async (req,res) => {
        try {
            let {email,password} = req.body
            
            const user = await User.findOne({email})

            if(!user) return res.status(400).json({msg:"Email doesn't exist in our database"})
            
            const isValidPass = await bcrypt.compare(password, user.password)
            
            if(!isValidPass) return res.status(400).json({msg:"Invalid password"})

            res.status(200).json(user)

        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    sendEmail : async (req,res) => {
        try {
            const {from, to, subject, body} = req.body

            const toUser = await User.findOne({email:to})

            if(!toUser) return res.status(400).json({msg:"Email doesn't exist in our system..."})

            toUser.inbox = [...toUser.inbox, {
                from,
                to,
                subject,
                body, 
                id: new Date().toISOString(),
                important: false,
                starred:false,
            }]

            await User.findOneAndUpdate({email:to},{$set:{inbox:toUser.inbox}})
            
            const fromUser = await User.findOne({email:from})
            fromUser.sent = [...fromUser.sent, {
                from,
                to,
                subject,
                body,
                id: new Date().toISOString(),
                important: false,
                starred:false,
            }]

            await User.findOneAndUpdate({email:from},{$set:{sent:fromUser.sent}})

            res.status(200).json({msg:"Email sent successfully..."})
            
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    moveToTrash : async (req,res) => {
        try {
            const {userID, mailID} = req.params
            
            const user = await User.findOne({_id:userID})

            const updatedTrash = [...user.trash, user.inbox.find(mail => mail.id === mailID)]

            await User.findOneAndUpdate({_id:userID},{$set:{trash: updatedTrash}})
            
            const newInbox = user.inbox.filter(mail => mail.id !== mailID)

            await User.findOneAndUpdate({_id:userID},{$set:{inbox:newInbox}})

            res.status(200).json({msg:"Moved to trash."})

        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    deleteFromTrash : async (req,res) => {
        try {
            const {userID, mailID} = req.params
            
            const user = await User.findOne({_id:userID})

            const updatedTrash =  user.trash.filter(mail => mail.id !== mailID)

            await User.findOneAndUpdate({_id:userID},{$set:{trash: updatedTrash}})

            res.status(200).json({msg:"Mail deleted permanently."})

        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    deleteFromInbox : async (req,res) => {
        try {
            const {userID, mailID} = req.params
            
            const user = await User.findOne({_id:userID})

            const newInbox = user.inbox.filter(mail => mail.id !== mailID)

            await User.findOneAndUpdate({_id:userID},{$set:{inbox:newInbox}})

            res.status(200).json({msg:"Mail deleted permanently."})
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = userController