// Require Libraries
var express = require('express');
var path= require('path');
const bodyParser= require('body-parser');
const nodemailer = require('nodemailer');

// App Setup
var app = express();
//pug set up
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

// Middleware
//to make POST request 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// to use style from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home');
  });

app.get("/about", function(req, res){
  res.render('about');
});

app.get("/work", function(req, res){
  res.render('work')
});

app.get("/contact", function(req, res){
  res.render('contact')
});
//nodemaiker
//A post request for NODEMAILER https://nodemailer.com/about/
app.post("/contact/send", function(req, res){
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'marvinlara321@gmail.com',
          pass: 'Malvoro53!',
      }
  })

//send mail
var mailOptions = {
  from: 'Marvin Lara <marvinlara321@gmail.com>',
  to: 'Marvoroo53@gmail.com',
  subject: 'Website Submission',
  text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
  html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
};
transporter.sendMail(mailOptions, function(error, info){
  if(error){
      console.log(error);
      res.redirect('/');
  } else {
      console.log('Message Sent: '+ info.response);
      res.redirect('/');
  }
});
});

// Start Server

app.listen(3000, () => {
  console.log('App is listening on localhost:3000!');
});