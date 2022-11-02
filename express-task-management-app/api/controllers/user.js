const UserService = require("../services/user");

const getUser = async (req, res) => {
    const { query } = req;
    const name = query.name;

    try {
        if (name) {
            const matches = await UserService.getUserByName(name);
            res.json(matches);
        } else {
            const quizzes = await UserService.getAllUsers();
            res.json(quizzes);
        }
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

module.exports = {
    getUser,

};