const Project = require("../models/project");
const User = require("../models/user");

const SharedService = require("../services/shared");

// Updates the project with tasks associated with the user
const _updateProjectTask = async(tasks, userId) => {
    const pushProjectTasks = await Project.updateOne(
        {
            $and: [{users: userId}, {tasks: {$nin: tasks}}]
        },
        {$push: {tasks: tasks}}
    )

    return pushProjectTasks
}

// Create User
const createUser = async (body) => await SharedService.create(User, body);

// Get User by ID
const getUserById = async (id) => await SharedService.get(User, id);

// Get All Users
const getAllUsers = async () => await SharedService.all(User);

// Update User by ID
const updateUserById = async(body, id) => { 
    const {tasks} = body;
    
    // Updates the user
    const updateUser = await SharedService.update(User, id, body);
    
    // Updates project to include the tasks with the user
    const updateProject = await _updateProjectTask(tasks, id);

    return {User: updateUser, Project: updateProject}
}

// Get User by using isActive
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