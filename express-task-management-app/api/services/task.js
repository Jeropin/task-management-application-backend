const Task = require("../models/task");

const SharedService = require("../services/shared");

const getTaskById = async (id) => {
    const getTask = await Task.findById(id).
    populate('user').
    populate({
        path: 'project', 
        model: 'Project',
        select: ['_id', 'name',]
    })
}

const getAllTasks = async () => await SharedService.all(Task);

module.exports = {
    getAllTasks,
    getQuizByName,
    getTaskById,
}