const nodemon= require('nodemon')
const Forecast= require('./forecast/forecast')
const forecast= new Forecast();
const express= require("express");
const env= require("dotenv").config();
const morgan= require("morgan");
const path= require("path");
const { features } = require('process');
const PORT= process.env.PORT

//Express Config 
const app= express()
app.use(express.json()) 
app.use(morgan('combined'))

// Allow any method from any host and log requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`); 
        next(); 
    }
})

app.get("/", (req, res) => {
    res.send("Nothing here")
    //res.render("index");
});

app.get("/forecast/:stock", (req, res)=>{
  let stock= req.params.stock;
  forecast.getPrices(stock).then(data=>{
    res.status(200).send(data)
  }).catch(err=>{
    res.status(404).send(err)
  })
})







//Server starting on port
app.listen(PORT)
console.log(`GO to http://localhost:${PORT}`)


