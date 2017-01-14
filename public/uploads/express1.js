var express=require("express");
var path=require("path");
var nodemailer=require("nodemailer");
var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');
app.use
app.get('/',function(req,res)
{
	res.render('form');
});
app.post('/form/a',function(req,res)
{
	console.log("testing");
	res.render('a');
});
app.post('/form/a',function(req,res)
{
	var transporter=nodemailer.createTransporter({
	service:'Gmail',
	auth:{
	user:'senthil111itworld@gmail.com',
	pass:'senthil',
		}

});
	var mailOptions={
		from:'sethil111itworld@gmail.com',
		to:'senthil111itworld@gmail.com',
		subject:'no',
		text:'say hello node js',
		html:'<h1>hotshot company</h1>',
			}
	if(app.get('env')==='development'))
		{
		res.render("404 error");
		}
});
app.listen(8800);
