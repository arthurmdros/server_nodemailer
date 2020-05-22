const nodemailer = require('nodemailer');
var express = require("express");

var app = express();
var port = process.env.PORT || 3002;

var auth = {
    type: 'oauth2',
    user: 'YOUR_GMAIL_ADDRESS',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',    
    accessToken : 'YOUR_ACCESS_TOKEN'
};

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/send', function(req,res) {
    response = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }

    var mailOptions = {
        from: req.body.name,
        to: req.body.email,
        subject: 'I am :' + req.body.name,
        text: req.body.message,
        html: 'Message from: ' + req.body.name + '<br></br> Email: '+ req.body.email + '<br></br> Message: ' + req.body.message,
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });

    transporter.sendMail(mailOptions, (err, res) => {
        if(err){
            return console.log(err);
        } else{
            return console.log(JSON.stringify(res));
        }
    });
})

app.listen(port);