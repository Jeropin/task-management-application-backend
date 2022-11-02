const Task = require("../models/task");
const User = require("../models/user");

const SharedService = require("../services/shared");

const getAllUsers = async () => await SharedService.all(User);

const getUserByName = async (searchTerm) => {
    const matches = await User.find({
        name: { $regex: searchTerm, $options: 'i' }
    });
    return matches;
};

module.exports = {
    getAllUsers,
    getUserByName,
}