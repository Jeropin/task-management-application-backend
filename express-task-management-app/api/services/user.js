const Task = require("../models/task");
const User = require("../models/user");

const SharedService = require("../services/shared");

const createUser = async (body) => await SharedService.create(User, body);

const getUserById = async (id) => await SharedService.get(User, id);

const getAllUsers = async () => await SharedService.all(User);

const updateUserById = async(body, id) => await SharedService.update(User, id, body);

const getUserByActive = async (isActive) => {

    // Setting the isACtive variable to Boolean value true/false/or null
    if(isActive === "true"){
        isActive = true;
    } else if(isActive === "false"){
        isActive = false;
    } else{
        isActive = null;
    }
    
    // Finds matches of isActive
    const matches = await User.find({
        isActive: isActive 
    });
    return matches;
};

module.exports = {
    getAllUsers,
    getUserByActive,
    createUser,
    getUserById,
    updateUserById,
}