const express= require("express");
const app= express();
// native node module
const  https= require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config()



app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

//res.send("Server is up and running");
});



app.post("/", function(req, res){
//  res.send(req.body.CityName);
//  console.log("Post request received.");

const query= req.body.CityName;
const apiKey= process.env.API_KEY;
const unit= "metric";
const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url,function(response){

  console.log(response.statusCode);
  response.on("data", function(data){
  //  console.log(data);
    const weatherData= JSON.parse(data);
    //console.log(weatherData);
    const temp= weatherData.main.temp;
    const weatherDescription= weatherData.weather[0].description;
  //  console.log(weatherData.weather[0].description);
    const icon= weatherData.weather[0].icon;
    const image="https://openweathermap.org/img/wn/"+ icon+ "@2x.png";


    res.write("<p>The weather is currently "+ weatherDescription+ "</p>");
    res.write("<h1>The temp in "+ query +" is "+ temp+ " degree celcius. </h1>")
    res.write("<img src="+ image + ">");

    res.send();

  });

});

});






app.listen(3000, function(){
console.log("server is running at port 3000.")
});
