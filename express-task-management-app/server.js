// start the server: npm run start

// require in our dependencies
const cors = require("cors");
const exprees = require("express");

// call the express functions which create the express applicaiton
// this allows us to use the full functionality of our express application
const app = express();
const port = 888;

// TODO: require in our route resource

// apply our cors middleware
app.use(cors());

// middleware to pares POST/PUT bodies express
app.use(express.json());

// TODO: add resouce route to our express app

//start the server
app.listen(port, () =>{
    console.log(`SERVE IS LISTENING ON PORT ${port}`);
})