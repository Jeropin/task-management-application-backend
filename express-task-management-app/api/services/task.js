const Task = require("../models/task");

const SharedService = require("../services/shared");

// Checks if Task status is assigned
const _canUpdateTask = async (id) =>{
    const validTask = await Task.findOne({ _id: id, status: "assigned"})
    return Boolean(validTask);
}

// Creates a new task using body
const createTask = async(body) => await SharedService.create(Task, body);

// Deletes a task using id
const deleteTaskById = async(id) => await SharedService.remove(Task, id);

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
}