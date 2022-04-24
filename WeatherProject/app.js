const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {
  console.log(req.body.jokeType)
  //console.log("Post Received")
  const url = "https://v2.jokeapi.dev/joke/" + req.body.jokeType
  //const url = "https://api.openweathermap.org/data/2.5/weather?q=London&" + apiid
  https.get(url, function(response) {
    console.log(response.statusCode)
    response.on("data", function(data) {
    //   const weatherData = JSON.parse(data)
      const jokeData = JSON.parse(data)
      const joke = jokeData.joke;
      const id = "JokeID: " + jokeData.id
      console.log(id + joke)
      res.write(`<p>${id}</p>`)
      res.write(`<h1>${joke}</h1>`)
      res.send()
    })
  })
  //res.send("server is running")
})
app.listen(3000, function() {
  console.log("Server is running")
})
