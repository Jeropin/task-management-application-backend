const Task = require("../models/task");
const Project = require("../models/project");
const User = require("../models/user");

const SharedService = require("../services/shared");

// Updates the project with tasks associated with the task
const _updateProjectTask = async(taskId) => {
    const pullProjectTasks = await Project.updateOne(
        {tasks: taskId},
        {$pull: {tasks: taskId}},
        {returnDocument: "after"}
    )
    return pullProjectTasks
}

// Updates the project with tasks associated with the task
const _updateUserTask = async(taskId) => {
    const pullUserTasks = await User.updateOne(
        {tasks: taskId},
        {$pull: {tasks: taskId}},
        {returnDocument: "after"}
    )
    return pullUserTasks
}

// Checks if Task status is assigned
const _canUpdateTask = async (id) =>{
    const validTask = await Task.findOne({ _id: id, status: "assigned"})
    return Boolean(validTask);
}

const getAllTask = async() => await SharedService.all(Task);

// Creates a new task using body
const createTask = async(body) => await SharedService.create(Task, body);

// Deletes a task using id
const deleteTaskById = async(id) =>{
    
    // Delete the task
    const removeTask = await SharedService.remove(Task, id);

    // Updates Project dissociate task from project
    const updateProject = await _updateProjectTask(id)

    // Updates User to dissociate task from user
    const updateUser = await _updateUserTask(id)

    // Returns object that shows removeTask, updateProject, updateUser
    return {Task: removeTask, Project: updateProject, User: updateUser};
}

// Gets task by id
const getTaskById = async (id) => {
    try{
        // Gets task and populates the user and project
        const task = await Task.findById(id).
        populate('user').
        populate({
            path: 'project', 
            model: 'Project',
            select: ['_id', 'name',]
        });
        return task;

    } catch (error){
        return error;
    }
}

// Updates task
const updateTaskById = async (body, id) =>{
    const {status} = body
    
    // Checks if status is assigned
    const canUpdate = await _canUpdateTask(id);

    // If Status is assigned upate task
    if(canUpdate){
        const task = await SharedService.update(Task, id, body)
        return task
    }

    // Else check if status is being updated
    else{

        // If status is being updated, only update status
        if(status){
            const task = await SharedService.update(Task, id, {status: status})
            return task
        }

        // Else Throw error
        else{
            throw new Error(`Cannot update Task ${id}`);
        }
    }

}

module.exports = {
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    getAllTask,
}