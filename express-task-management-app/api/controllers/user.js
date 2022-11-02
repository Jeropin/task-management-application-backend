const User = require("../models/user");
const UserService = require("../services/user");

// Get User
const getUser = async (req, res) => {
    const { query } = req;
    const isActive = query.isActive;
    try {
        if (Boolean(isActive)) {
            const matches = await UserService.getUserByActive(isActive);
            res.json(matches);
        } else {
            const quizzes = await UserService.getAllUsers();
            res.json(quizzes);
        }
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// Create User
const createUser = async (req, res) =>{
    const { body } = req;
    try{
        const user = await UserService.createUser(body);
        res.json(user)
    } catch (error){
        res.status(500).send({ error: error.toString() })
    }
}

// Get User by ID
const getUserById = async (req, res) =>{
    const { params: {id} } = req;

    try{
        const user = await UserService.getUserById(id);
        res.json(user)
    } catch (error){
        res.status(500).send({ error: error.toString()})
    }
}

// Update User By ID
const updateUserById = async (req, res) =>{
    const {body, params: {id}} = req;
    try{
        const user = await UserService.updateUserById(body, id);
        res.json(user)
    } catch(error){
        res.status(500).send({ error: error.toString() });
    }
}

module.exports = {
    getUser,
    createUser,
    getUserById,
    updateUserById,
};