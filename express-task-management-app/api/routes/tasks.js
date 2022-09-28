const router = require("express").Router();

// require in our mock data to support our API responses
const tasks = require('../../../mock-data/tasks.json');

// GET /tasks
router.get("/", (req, res) =>{
    const {query} = req;
    const name = query.name;

    let all = tasks;

    if(name){
        all = tasks.filter((task) =>{
            return task.name.toLowerCase().includes(name.toLocaleLowerCass());
            
        });
    }

    res.json(all);
});

// POST /tasks
router.post("/", (req, res) =>{
    const {body} = req;

    const id = tasks.length + 1;

    res.json({...body, id});
});

// GET /tasks/:id
router.get("/:id", (req, res) =>{
    const {params} = req;
    const id = params.id;

    const task = tasks.find((task) =>{
        return task.id === parseInt(id);
    });

    if(task){
        res.json(task);
    } 
    else {
        res.status(404).json({ error: `Task by id ${id} not found`});
    }
})

// PUT /tasks/:id

// TO DO: Add logic that will only update name, detail and timeline object
// TO DO: Add logic that will allow the status to be updated
router.put("/:id", (req, res) =>{
    const {params, body} = req;
    const id = params.id;

    const task = tasks.find((task) =>{
        return task.id === parseInt(id);
    })

    const status = task.status;

    if(task){
        if(status === "assigned"){
            res.json({...task, ...body});
        }
        else{
            res.status.json(403).json({error: `Project cannot be updated since "${task.status}" is not "assigned"`})
        }
    }

    else{
        res.status(404).json({error: `Project by id ${id} not found`})
    }

})

// DELETE /tasks/:id
router.delete("/:id", (req, res) =>{
    const { params } = req;
    const id = params.id;

    const task = tasks.find((task) => { 
        return task.id === parseInt(id);
    })

    if(task){
        res.json({deleted: {name: task.name, id: task.id}})
    }
    else{
        res.status(404).json({ error: `Task by id ${id} not found`})
    }
})

module.exports = router;