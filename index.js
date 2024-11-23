const express = require("express")
const app = express()
const path =require("path")
const fs = require("fs")

//These both are parsers
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    const filesPath = path.join(__dirname, "files")
    fs.readdir(filesPath,(err,files)=>{
        res.render("index",{files:files})
    })
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}`,req.body.details,(err)=>{
        res.redirect("/")
    })
})
app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,data)=>{
        res.render("show",{filename: req.params.filename, data:data})
    })
})

app.listen(3000,()=>{
    console.log(`Server running on port ${3000}`)
})