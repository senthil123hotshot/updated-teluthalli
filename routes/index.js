var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../config/db').connection;
var session = require('express-session');
var request = require('request');




/* GET home page. */

/*user view of pdf files*/
router.get('/',function(req,res){

  var query =" SELECT * FROM fileimage";
  connection.query(query,function(err,data){
    if(err){
      console.log('err');
    }else{
        for(var i=0;i<data.length;i++){
          data[i].imagepath = data[i].imagepath.replace("public/","");
          data[i].filepath = data[i].filepath.replace("public/","");
              var d = data[i].date+"";
              var splitArray = new Array();
              splitArray = d.split(" ");
          data[i].date= splitArray[1]+" "+splitArray[2]+" "+splitArray[3];
          var z = new Date(data[i].date);
          data[i].month= z.getMonth()+1;
          data[i].year =z.getFullYear();
          data[i].day =z.getDate();
          data[i].pdfname=data[i].pdfname;

         }
         console.log(data);
        res.render('userdisplay',{data: data,session_info: req.session});
    }
  })
})










module.exports = router;
