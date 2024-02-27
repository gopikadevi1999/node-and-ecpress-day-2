import userModel from '../modules/user.js'

import dotenv from "dotenv"
dotenv.config()

const getAllUsers = async (req, res) => {
    try {
        let user = await userModel.find()
        res.status(200).send({
            message: "user data fetch successful",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
    
}

const getUserById = async (req, res) => {
    try {
        
        let user = await userModel.findById({ _id: req.params.id })
        res.status(200).send({
            message: "user data fetch successful",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
    
}


const addUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            let newUser = await userModel.create(req.body)
            res.status(200).send({
                message: "Add User successfully",
            })
        }
        else {
            res.status(400).send({
                message: `user with  ${req.body.email} already exists`,
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

const editUserById = async (req, res) => {
    
    try {
        
        let user = await userModel.findById({ _id: req.params.id })
        if(user){
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            user.role = req.body.role
            user.status = req.body.status

            await user.save()

            res.status(200).send({
                message: "user edited successfully",
            })
        }
        else{
            res.status(400).send({
                message: "Invalid user id",
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
    
}

const deleteUserById = async (req, res) => {
    try {
        
        let user = await userModel.findById({ _id: req.params.id })
        if(user){
            await user.deleteOne( req.params.id )
            res.status(200).send({
                message: "user deleted successfully",
            })
        }
        else{
            res.status(400).send({
                message: "Invalid user id",
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
    
}

export default {
    getAllUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
}
