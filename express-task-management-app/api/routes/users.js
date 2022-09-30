const router = require("express").Router();

const users = require("../../../mock-data/users.json");

// GET /users
// Note: changed users.json data for isActive from bool to string
router.get("/", (req, res) =>{
    const { query } = req;
    const isActive = query.isActive
    
    let all = users;

    if(isActive){
        all = users.filter((user)=>{
            return user.isActive === isActive;
        })
    }

    res.json(all);
})

// GET /users/id
router.get("/:id", (req, res) =>{
    const { params } = req;
    const id = params.id;
    
    const user = users.find((user) =>{
        return user.id === parseInt(id);
    });

    if(user){
        res.json(user);
    } else {
        res.status(404).json({error: `User by id ${id} not found`})
    }
})

// PUT /users/:id
router.put("/:id", (req, res) =>{
    const {params, body} = req;
    const id = params.id;

    const user = users.find((user) =>{
        return user.id === parseInt(id);
    })

    if(user){
        res.json({...user, ...body});
    } else {
        res.status(404).json({error: `User by id ${id} not found`})
    }
})

module.exports = router;