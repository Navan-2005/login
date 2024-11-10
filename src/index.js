const express =require('express')
const path=require('path')
const bcrypt=require('bcrypt')
const collection=require('./config')

const app=express()

app.use(express.json());
// Static file
// app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup', async (req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }

    const existuser=await collection.findOne({name:data.name})
    if(existuser)
    {
        res.send(`Username ${existuser} already exist`)
    }
    else{
        data.password=await bcrypt.hash(data.password,10);
        const userdata=await collection.insertMany(data);
        res.render('login')
        console.log(userdata);
        
    }
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});

app.listen(8080,()=>{
    console.log(`Running on server 8080`);
    
})