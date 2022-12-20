var multer =require('multer')
const express= require('express')
const path =require("path")
var router = express.Router()
const app =express()
// var popup = require('popups');
// let alert = require('alerts'); 

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")



var storage =multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"uploads")
    },
    filename: function(req,filen,cb)
    {
        cb(null,file.fieldname+"-"+Date.now()+".xlsx")
    }
})


const maxSize = 1 * 1000 * 1000;

var upload=multer({
    storage:storage,
    limits:{filessize:maxSize},
    fileFilter:function(req,file,cb)
    {
        var filetypes=/xlsx|xlsm/;
        var mimetype=filetypes.test(file.mimetype);

        var extname=filetypes.test(path.extname(file.originalname).toLowerCase());

        if(mimetype && extname)
        {
            return cb(null,true);
        }
        cb("Wrong File type");
    }
}).single("file");

router.get("/",function(req,res){
    res.render("home");
})


router.post("/uploadfile",function (req,res,next)
{
    upload(req,res,function (err){
        if(err){
            res.send(err);
        }
        else
        {
            res.render("succes");
        }
    })
})

module.exports=router;