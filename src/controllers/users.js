import { findIndex } from "../common/helper.js"
import DB_CONFIG from "../config/DbConfig.js"
import mongodb, { MongoClient } from "mongodb"

const user = []

const client = new MongoClient(DB_CONFIG.DB_URL)

const getAllUsers = async (req, res) => {
    await client.connect();
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        let user = await db.collection("user").find().toArray()
        res.status(200).send({
            message: "user data fetch successful",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
        })
    }
    finally {
        client.close();
    }
}

const getUserById = async (req, res) => {
    await client.connect();
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        let user = await db.collection("user").findOne({ _id:new mongodb.ObjectId(req.params.id) })
        res.status(200).send({
            message: "user data fetch successful",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
        })
    }
    finally {
        client.close();
    }
}


const addUser = async (req, res) => {
    await client.connect();
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        let user = await db.collection("user").findOne({ email: req.body.email })
        if (!user) {
            let newUser = await db.collection("user").insertOne(req.body)

            // let id = user.length ? user[user.length - 1].id + 1 : 1
            // req.body.id = id
            // user.push(req.body)

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
        })
    }
    finally {
        client.close();
    }

}

const editUserById = async (req, res) => {
    await client.connect();
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        let user = await db.collection("user").findOne({ _id:new mongodb.ObjectId(req.params.id) })
        if(user){
            await db.collection("user").updateOne({ _id:new mongodb.ObjectId(req.params.id) },{$set:req.body})
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
        })
    }
    finally {
        client.close();
    }
}

const deleteUserById = async (req, res) => {
    await client.connect();
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        let user = await db.collection("user").findOne({ _id:new mongodb.ObjectId(req.params.id) })
        if(user){
            await db.collection("user").deleteOne({ _id:new mongodb.ObjectId(req.params.id) })
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
        })
    }
    finally {
        client.close();
    }
}

export default {
    getAllUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
}
