var express= require('express')
const path =require("path")
var app = express();
var router = express.Router()
var port =8000;

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
var display =require('./controllers/display')



app.use('/',display);


app.listen(port,()=>{
    console.log("server running");
})