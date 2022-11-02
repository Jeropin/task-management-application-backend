// start the server: npm run start

// require in our dependencies
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// require in mongo config
const {username, password, dbName} = require('./config.json');

// call the express functions which create the express applicaiton
// this allows us to use the full functionality of our express application
const app = express();
const port = 8888;

// require in our route resource
const projects = require("./api/routes/projects");
const tasks = require("./api/routes/tasks");
const users = require("./api/routes/users");

// apply our cors middleware
app.use(cors());

// middleware to pares POST/PUT bodies express
app.use(express.json());

// add resouce route to our express app
app.use("/projects", projects);
app.use("/tasks", tasks);
app.use("/users", users);

//start the server
app.listen(port, () =>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`);
})

// Connect to MongoDB 
const mongoURL = `mongodb+srv://${username}:${password}@clustermanagementapp.etxew68.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});
