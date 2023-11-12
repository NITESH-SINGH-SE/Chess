// Import Require stuffs
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");   // Connecting the database
const path = require("path");
const hbs = require("hbs");
const Register = require("./register");

// Using static pages
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());    // To use json files format
app.use(express.urlencoded({extended:false}));  // For using the url and getting the data.

app.use(express.static(static_path));   // For using static files.
app.set("view engine", "hbs");  // Using hbs view engine.
app.set("views", template_path);
hbs.registerPartials(partials_path);
// console.log(static_path);  // Checking the path wher __dirname leads to.

// Endpoints
app.get("/", function (req, res){
    res.render("index");
});

// Register Pages
app.get("/register", function (req, res){
    res.render("register");
});

app.post("/register", async (req, res)=>{
    try{
        const password = req.body.pass;
        const confirmpassword = req.body.passCon;

        if(password === confirmpassword){
            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.pass,
                score: 0,
                delete: false
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }
        else{
            res.send("Password Not Matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
});

// Login Pages
app.get("/login", function (req, res){
    res.render("login");
});

app.post("/login", async (req, res)=>{
    try{
        console.log(req.body);

        const email1 = req.body.email;
        const password1 = req.body.pass;

        const user = await Register.findOne({email: email1});
        
        if(user.password == password1){
            res.status(201).render("index");
        }else{
            res.send("Invalid Details");
        }
    } catch(error){
        res.status(400).send("Invalid Details");
    }
});

// Listening at Port
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
console.log("Hello World");
// alert("I am an alert box!");