const TaskService = require("../services/task");

const getTask = async (req, res) =>{
    const {query} = req;
    const name = query.name;

    try{
        if(name){
            const matches = await TaskService.getTaskByName(name);
            res.json(matches);
        } else {
            const tasks = await TaskService.getAllTasks();
            res.json(tasks);
        }
    } catch (error) {
        res.status(500).send({error: error.toString()});
    }
};

const getTaskById = async (req, res) =>{
    const {params: {id}} = req;
    try{
        const task = await TaskService.getTaskById(id);
        res.json(task)
    } catch (error){
        res.status(500).send({ error: error.toString()});
    }
}
module.exports = {
    getTask,
    getTaskById,
}