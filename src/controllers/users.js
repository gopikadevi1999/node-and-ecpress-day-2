import {findIndex} from "../common/helper.js"

const user = [{
    id: 1,
    firstname: "gopika",
    lastname: "devi",
    mobile: "9789235454",
    age: "24",
    status: true,
    role: "user"
}]

const getAllUsers = (req, res) => {
    try {
        res.status(200).send({
            message: "user data fetch successful",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
        })
    }
}

const getUserById = (req, res) => {
    try {
        //console.log(req.params)
        const { id } = req.params
        let index = findIndex(user, id)
        if (index !== -1) {
            res.status(200).send({
                message: "user data fetch successful",
                user: user[index]
            })
        }
        else {
            res.status(400).send({
                message: "Invalid user id"

            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
        })
    }
}

const addUser = (req, res) => {
    try {
        //console.log(req.body)

        let id = user.length? user[user.length-1].id+1:1

        req.body.id = id

        user.push(req.body)

        res.status(200).send({
            message: "Add User successfully",
        })
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
        })
    }
}

const editUserById = (req, res) => {
    try {
        //console.log(req.params)
        const { id } = req.params
        let index = findIndex(user, id)

        if (index !== -1) {

            req.body.id = Number(id)
            user.splice(index, 1 , req.body)

            res.status(200).send({
                message: "user edited successful",
                
            })
        }
        else {
            res.status(400).send({
                message: "Invalid user id"

            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
        })
    }
}

const deleteUserById = (req, res) => {
    try {
        //console.log(req.params)
        const { id } = req.params
        let index = findIndex(user, id)

        if (index !== -1) {

            user.splice(index, 1)

            res.status(200).send({
                message: "user delete successful",
                
            })
        }
        else {
            res.status(400).send({
                message: "Invalid user id"

            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
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
