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
// Post/ projects
router.post("/", (req, res) =>{
    const {body} = req;

    const id = projects.length + 1;
    res.json({...body, id});
})


module.exports = router;