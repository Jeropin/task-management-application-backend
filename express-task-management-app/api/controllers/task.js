const TaskService = require("../services/task");

// Create Task
const createTask = async (req, res) =>{
    const {body} = req;

    try{
        const task = await TaskService.createTask(body);
        res.json(task)
    } catch (error){
        res.status(500).send({ error: error.toString() });
    }
}

// Get Task By ID
const getTaskById = async (req, res) =>{
    const {params: {id}} = req;

    try{
        const task = await TaskService.getTaskById(id);
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

const getAllTask = async (req, res) =>{
    try{
        const task = await TaskService.getAllTask();
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

// Update Task By ID
const updateTaskById = async (req, res) =>{
    const {body, params:{id}} = req;

    try{
        const task = await TaskService.updateTaskById(body, id);
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

// Delete Task By ID
const deleteTaskById = async (req, res) =>{
    const {params: {id}} = req;

    try{
        const task = await TaskService.deleteTaskById(id);
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

module.exports = {
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    getAllTask,
}