const express=require('express')
const path=require('path')
const bcrypt=require('bcrypt')
const collection=require('./config');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')

app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async (req,res)=>{
    try{const data={
         name:req.body.username,
         password:req.body.password
    }
    const existinguser=await collection.findOne({name:data.name});
    if(existinguser)
    {
        res.send('User name already Exist')
        console.log('User name already Exist');
        
    }
    else{
        data.password=await bcrypt.hash(data.password,10);
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    res.render('login')
    
    }}
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); // Handle errors
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


app.listen(3000);
