const Task = require("../models/task");
const User = require("../models/user");
const Project = require("../models/project");

const SharedService = require("../services/shared");

// Finds all projects related to users array and dissociate user with project
const _updateProjectsUsers = async(users, id) =>{
    const updateAllProjects = await Project.updateMany(
        {
            // And statement: Finds all users related to a project and does not include the project id being updated
            $and:[{users: {$in: users}}, {_id: {$ne: id}}]
        },

        // Updates to pull users from that project
        {$pull: {users: {$in: users}}},
        {returnDocument: 'after'}
    );

    return updateAllProjects;
}

// Finds all users related to users array and updates to dissociate tasks with user
const _updateUsersTasks = async(users) =>{
    const updateAllusers = await User.updateMany(
    
        // Finds all users related to the user array
        {_id: {$in: users}}, 
        {tasks: []},
        {returnDocument: 'after'}
    )
    return updateAllusers;
}

// Returns true or false if manager is already assigned to another project
const _isManagerAssign = async(manager) =>{
    const managerCheck = await Project.find({manager: {$in: manager}});
    if(manager !== undefined && (Boolean(managerCheck.length))){
        return false;
    } else {
        return true;
    }
}

// Returns true or false if users is already assigned to another project
const _isUserAssign = async(users) =>{
    const userCheck = await Project.find({users: {$in: users}});
    if(users !== undefined && (users.length === userCheck.length)){
        return false;
    } else { 
        return true;
    }
}

// Shared function checking if project name is unique
const _isUniqueName = async (name) =>{
    const match = await Project.find({name: name}).collation( {locale: 'en', strength: 1});
    if(match.length === 0){
        return true;
    } else {
        return false;
    }
}

// Gets all projects
const getAllProjects = async () => await SharedService.all(Project);

// Gets project by id and populated the manager and task
const getProjectById = async (id) => {  

    try{
        // Find project and populate the manager and tasks
        const project = await Project.findById(id).
        populate('manager').
        populate({
            path: 'tasks', 
            model: 'Task',
            select: ['_id', 'name', 'details'],
        });

        return project;
    } catch (error){
        return error
    }
}

// Gets project by query of name
const getProjectByName = async (searchTerm) => {
    const matches = await Project.find({
        name: { $regex: searchTerm, $options: 'i' }
    });
    return matches;
}

// Creates a project with new id
const createProject = async (body) => {
    const {name, tasks, users, manager} = body;

    //Checks if user is assigned to another project
    const isUserAssign = await _isUserAssign(users);

    //Checks if manager is assigned to another project
    const isManagerAssign = await _isManagerAssign(manager);

    // Checks if name is unique
    const isUniqueName = await _isUniqueName(name);

    // ***START IF CONDITIONS*** //
    // If one or more user is assigned to another project throw an error
    if(!isUserAssign) throw new Error(`One or more User ${users} is already assigned to another project`);

    // If the manager is assgined to another project throw an error
    else if(!isManagerAssign) throw new Error(`Manager ${manager} is already assigned to another project`);

    // If name is not unique throw an error
    else if(!isUniqueName) throw new Error(`Cannot create project, Name:${name} is already taken`);

    // Else process the new project
    else{
        const createdProject = await SharedService.create(Project, body);
        return createdProject;
    }
    // ***END IF CONDITIONS *** //
}

// Updates project with id
const updateProjectById = async(body, id) =>{
    const {name, users} = body;

    // Checks if name is unique
    const isUniqueName = await _isUniqueName(name);

    // If Name is unique update project with body
    if(isUniqueName){

        // Updates Project
        const updatedProject = await SharedService.update(Project, id, body)

        // Updates users to dissociate with tasks
        const updateAllUsers = await _updateUsersTasks(users);

        // Updates all projects to dissociate with users 
        const updateAllProjects = await _updateProjectsUsers(users, id);

        // Returns an object 
        return {ProjectUpdate: updatedProject, AffectProjects: updateAllProjects, UsersUpdate: updateAllUsers}
    } 

    // Else throw Error
    else{
        throw new Error(`Cannot update project, Name:${name} is already taken.`);
    }

}

module.exports = {
    getAllProjects,
    getProjectByName,
    getProjectById,
    createProject,
    updateProjectById,
}