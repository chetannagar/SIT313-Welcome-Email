const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
//require("dotenv").config()
const sgMail = require('@sendgrid/mail');
const { stringify } = require("querystring");
sgMail.setApiKey("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");
//const apiKey = `${process.env.SENDGRID_API_KEY}`;
//sgMail.setApiKey(apiKey);
//console.log(apiKey)



const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) =>{

  const email = req.body.email

  const msg = {
      to: email,
      from: 'cnagar403@gmail.com',
      //from: 'cnagar@deakin.edu.au',
      subject: 'Welcome Email',
      text: 'Welcome new subscriber to my website',
      html: '<strong>Welcome new subscriber to my website</strong>',
  };

  sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })

  res.send("Email Sent Successfully")

})

app.listen(3000, function (request, response){
    console.log("server is running on port 3000")
})