const express = require("express")
const app = express();
const connectDB = require("./config/database")
const Auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const Home = require("./routes/home")
const AuthMiddlewere = require("./middleweres/auth")
require('dotenv').config();
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", Auth)

app.use("/", AuthMiddlewere, Home);

function runServer (){
    connectDB( process.env.MONGO_URL )
    .then( ()=> {
        console.log("Connected With DB Succesfully")

        app.listen( process.env.port || 3000 , ()=> {
            console.log(`Listing on port ${process.env.port || 3000}`)
        })
    })
    .catch( (error)=> {
        console.log("Error While Connecting to DB")
        console.log(error.message)
    })
}

runServer();