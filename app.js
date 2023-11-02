const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const today = require(__dirname+"/date.js");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));



const todays_date= today.getDate();
const temp="";
const weatherDesc = "Search for Temperature";
const query = "";
const imgurl = "https://cdn.iconscout.com/icon/free/png-256/sunny-weather-1-458138.png";




app.get("/", function(req, res){
  res.render("index",{temp1 : temp, date1 : todays_date, des :weatherDesc, place: query, img: imgurl});

});


app.post("/", function(req, res){

    const query = req.body.cityName
    const apikey = "7b7f9592041dffe47c516fd10fb15b4a"
    const unit = "metric"
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=" +unit;
   // console.log(url);
    https.get(url , function(response){
      //  console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const temperature1 = temp + "° C"
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.render("index",{temp1 : temperature1, date1 : todays_date, des :weatherDesc , place: query, img: imgurl});


        })
    })

})

app.listen(5000, function(){
  console.log("The server is currently runing on port 5000!");
})
