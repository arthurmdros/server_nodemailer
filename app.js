const nodemailer = require('nodemailer');
var express = require("express");

var app = express();
var port = process.env.PORT || 3002;

var auth = {
    type: 'oauth2',
    user: 'arthurmedeiros2005@gmail.com',
    clientId: '995217205047-kjblmkhvq3lvob9ng50nubiseu2qplh9.apps.googleusercontent.com',
    clientSecret: 'PEYQp-mWfxk2QJR6tGANm9Hq',
    refreshToken: '1//0fYwPumgbdK9XCgYIARAAGA8SNwF-L9IrmNBDJRegTuQxp6U6skXhsdOdZDUW7phfVAHiQavbJAG6aXEHudH6zBTUScWiq42tQqs',
    accessToken : 'ya29.a0AfH6SMAQ5AC8VS18fTBigwAEhS7TVYn0EjijeVBn_-91QPwRykVQjYgXxn6gEqAEoa_pdrBFDFmba6XDedKzXk4mSY9s_dFxJK36q37Q1z6-j0caPkvcEou0aCl4P5zAYrOx_Qgr3Ce1wCV7U3wGdNykzzvu6mWUCw0'
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