const TaskService = require("../services/task");

const createTask = async (req, res) =>{
    const {body} = req;

    try{
        const task = await TaskService.createTask(body);
        res.json(task)
    } catch (error){
        res.status(500).send({ error: error.toString() });
    }
}

const getTaskById = async (req, res) =>{
    const {params: {id}} = req;

    try{
        const task = await TaskService.getTaskById(id);
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

const updateTask = async (req, res) =>{
    const {body, params:{id}} = req;

    try{
        const task = await TaskService.updateTask(body, id);
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

const deleteTask = async (req, res) =>{
    const {params: {id}} = req;

    try{
        const task = await TaskService.deleteTask(id);
        res.json(task);
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}

module.exports = {
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
}