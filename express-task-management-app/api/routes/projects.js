const router = require("express").Router();

// require in our mock data to support our API responses
const projects = require("../../../mock-data/projects.json");

// GET /projects
router.get("/", (req, res) =>{
    // query params use the ?key=value
    // my API is oging to use a key called name

    const {query} = req;
    const name = query.name;

    let all = projects;

    // if query param name was used
    // filter by name of the quiz matching name passed in by user

    if (name) {
        all = projects.filter((project) =>{
            return project.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
        })
    }

    res.json(all);
})

// Post /projects
router.post("/", (req, res) =>{
    const {body} = req;

    const id = projects.length + 1;
    res.json({...body, id});
})

// Get /projects/:id
router.get("/:id", (req, res) =>{
    const { params } = req;
    const id = params.id;
    
    // Find project by id
    const project = projects.find((project) => {
        return project.id === parseInt(id);
    })

    // If match found return json of project
    if(project){

        // If there are tasks append taskCount
        if(project.taskID.length > 0){
            project.taskCount = project.taskID.length
        }

        // If there are users append userCount
        if(project.userID.length > 0){
            project.userCount = project.userID.length
        }

        res.json(project)
    } 

    // Else return an json error of project not found
    else
    {
        res.status(404).json({error: `Project by id ${id} not found.`})
    }
})


// PUT /projects/:id
router.put("/:id", (req, res) =>{
    const {params, body} = req;
    const id = params.id;

    // Find project by id
    const project = projects.find((project) => {
        return project.id === parseInt(id);
    })

    // Find project with same body.name
    const sameName = projects.find((project) =>{
        return project.name === body.name;
    })

    // If match found
    if(project){

        // If there is a project with the same name return error 403
        if(sameName){
            res.status(403).json({ error: `Project name "${sameName.name}" is already taken`})
        }

        // Else return updated project
        else{
            res.json({...project, ...body});
        }
    }

    // Else return error
    else{
        res.status(404).json({ error: `Project by id ${id} not found`});
    }
})

module.exports = router;