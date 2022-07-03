const express = require("express");
const path = require("path");
const fs = require("fs");
//const { compileClientWithDependenciesTracked } = require("pug");
const app = express();
const bodyparser = require("body-parser");
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true})
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desk: String,
  });
  const contact = mongoose.model('contact', contactSchema);

 
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory kaunsi directory se read karna h wah h views
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/about', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    //const params = {}
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{ 
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the data base")
    }).catch(()=>{
        res.status(400).send("item was not send to the data base")
    })
   // res.status(200).render('contact.pug');
})






// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});