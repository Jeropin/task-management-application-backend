const Task = require("../models/task");
const User = require("../models/user");
const Project = require("../models/project");

const SharedService = require("../services/shared");

// Shared function checking if project name is unique
const _isUniqueName = async (name) =>{
    const match = await Project.find({name: name}).collation( {locale: 'en', strength: 1})
    if(match.length === 0){
        return true;
    } else {
        return false;
    }
}

// Gets all proejcts
const getAllProjects = async () => await SharedService.all(Project);

// Gets project by id and populated the manager and task
const getProjectById = async (id) => {  
    const getProject = await Project.findById(id).
    populate('manager').
    populate({
        path: 'tasks', 
        model: 'Task',
        select: ['_id', 'name', 'details'],
    });

    return getProject;
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
    const {name} = body;

    // Checks if name is unique
    const isUniqueName = await _isUniqueName(name);

    // If name is unique create proeject
    if(isUniqueName){
        const createdProject = await SharedService.create(Project, body);
        return createdProject;
        
    } 
    
    // Else throw error
    else{
        throw new Error(`Cannot create project, Name:${name} is already taken.`);
    }
}

const updateProject = async(body, id) =>{
    const {name} = body;
    const isUniqueName = await _isUniqueName(name);

    
    if(isUniqueName){
        const updatedProject = await SharedService.update(Project, id, body);
        return updatedProject
    } 

    else{
        throw new Error(`Cannot update project, Name:${name} is already taken.`);
    }

}

module.exports = {
    getAllProjects,
    getProjectByName,
    getProjectById,
    createProject,
    updateProject,
}