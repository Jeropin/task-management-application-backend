const Project = require("../models/project");
const ProjectService = require("../services/project");

// Get Project
const getProject = async (req, res) =>{
    const {query} = req;
    const name = query.name;

    try{
        if (name) {
            const matches = await ProjectService.getProjectByName(name);
            res.json(matches);
        } else {
            const projects = await ProjectService.getAllProjects();
            res.json(projects);
        }
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// Get Project By ID
const getProjectById = async (req, res) =>{
    const {params} = req;
    const id = params.id;

    try {
        const project = await ProjectService.getProjectById(id);
        res.json(project)
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
}

// Create Project
const createProject = async (req, res) =>{
    const {body} = req;

    try{
        const project = await ProjectService.createProject(body);
        res.json(project)
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
}

// Update Project By ID
const updateProjectById = async (req, res) =>{
    const {body, params:{id}} = req;

    try{
        const project = await ProjectService.updateProjectById(body, id);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString()});
    }
}

module.exports = {
    getProject,
    getProjectById,
    createProject,
    updateProjectById,
};