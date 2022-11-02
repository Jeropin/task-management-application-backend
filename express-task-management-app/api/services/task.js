const Task = require("../models/task");

const SharedService = require("../services/shared");

const getAllTasks = async () => await SharedService.all(Task);

const getQuizByName = async (searchTerm) =>{
    const matches = await Task.find({
        name: {$regex: searchTerm, $options: 'i'}
    });
    return matches
}

module.exports = {
    getAllTasks,
    getQuizByName,
}