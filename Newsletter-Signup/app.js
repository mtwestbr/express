//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  //console.log(req)
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/e9abdf5cce";
  const options = {
    method: "POST",
    auth: "MTW:2122a1933efb5f80e2569e195b6d2b75-us14"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {

    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(port, function() {
  console.log("Server is running on port 3000")
})

// appid: 2122a1933efb5f80e2569e195b6d2b75-us14
// audienceID: e9abdf5cce
// const client = require("mailchimp-marketing");
//
// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });
//
// const run = async () => {
//   const response = await client.lists.batchListMembers("list_id", {
//     members: [{}],
//   });
//   console.log(response);
// };
//
// run();
