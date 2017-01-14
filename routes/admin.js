var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../config/db').connection;
var session = require('express-session');
var request = require('request');
var connectTimeout = require('connect-timeout');
var multer=require('multer');
var flash=require('connect-flash');
var timeout = connectTimeout({ time: 30000 });
var longTimeout = connectTimeout({ time: 65000 });
var path=require('path');
var dialog = require('dialog');
var download=require('download-file'); 

//image storage using multer

var storage =multer.diskStorage({
  destination: function(req,fileToUpload,cb){
    cb(null,'public/uploadsimage/');
  },
  filename: function(req,fileToUpload,cb){
    cb(null,fileToUpload.originalname);
  }
})

var upload = multer({storage: storage}).single('fileToUpload');


//pdf  storage using multer

var storage =multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'public/uploads/');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
})
var uploadpdf =multer({storage: storage}).single('file');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});
var v='';
router.post('/',function(req,res){
  v=req.body.name;
 
  var q='select * from admin where admin_name="'+req.body.name+'"';
  connection.query(q, function(err, rows){
		if(err) res.render('login',{error:"Database Error",session_info: req.session});
		else if(rows.length == 0) res.render('login',{error:"User does not exist.",session_info: req.session});
		else{
			if(req.body.password != rows[0].password) res.render('login',{error:"Password is not correct.",session_info: req.session});
			else{
				req.session.is_loggedin = true;
			     console.log('done');
           res.redirect('/admin/imageupload');
		}
  }
	})

})

router.get('/imageupload',longTimeout,function(req,res){
  res.render('index',{session_info: req.session});
})

router.post('/imageupload',function(req,res){


  upload(req,res,function(err){


    var magic =["image/jpeg","image/png","image/jpg"];
              var image={
                imagename : req.file.filename,
                imagepath : req.file.path,
                imagesize : req.file.size,
                imagetype : req.file.mimetype

              }


              if(image.imagetype == magic[0] || image.imagetype == magic[1] || image.imagetype == magic[2]){
                res.render('success',{image:image.imagepath,session_info:req.session})

          }
          else{
            res.render('index',{error:"ONLY IMAGES ARE ACCEPTED",session_info:req.session})
            console.log('error uploading ')

          }
          })

})

router.get('/pdfupload',function(req,res){
      res.render('success',{session_info: req.session});
})

router.post('/pdfupload',function(req,res){
  var d= new Date();

  uploadpdf(req,res,function(err){
var check=req.file.mimetype;
    if(req.file.mimetype == 'text/plain' || req.file.mimetype == 'application/pdf' || req.file.mimetype == 'application/vnd.oasis.opendocument.text'){
                  
                    if(req.body.image == undefined){
                      res.render('index',{error: "image is not uploaded please upload again", session_info:req.session});

                    }else{
                      var x={
                        filepath : req.file.path,
                        pdfname  : req.body.pdfname,
                        date     : d,
                        imagepath : req.body.image
                      }
                      connection.query('INSERT INTO fileimage SET ?',x,function(err,data){
                        if(err){
                          console.log('error');
                        }
                        else{
                          console.log('done uploading');
                        }
                      })
          console.log(req.session);
          res.redirect('/admin/admindisplay');
        }
    }
    else{
      res.render('success',{error:"ONLY PDF ARE ACCEPTED",session_info:req.session})
      console.log('error uploading ')

    }

    })

})


router.get('/admindisplay',function(req,res){
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
          data[i].pdfname=data[i].pdfname;
         }
        res.render('display',{data: data,session_info: req.session});
        console.log(data);
      }
  })
})
// router.get('/playdown/:path_name', function (req, res) {
//   var par=req.params.path_name;
// //   //console.log(par);
// //   //var query="SELECT filepath FROM fileimage WHERE fileimage_id="+req.params.id+"";
// // //connection.query(query);
// //   var r='/home/ensieg/myapp/1/public/par';
// //   //console.log(r);
// //    res.download(r, function (err) {
// //        if (err) {
// //            console.log(err);
// //        } else {
// //            console.log("Success");
// //        }
// //    });
// });

router.get('/playdown/:id',function(req , res){

    connection.query('select * from fileimage where fileimage_id="'+req.params.id+'"',function(err,data){
          if(err){
            console.log('err');
          }else{
            res.download(data[0].filepath,function(err){
              if(err){
                console.log('err');
              }else{
                console.log('success');
              }
              
            })
          }
    })


});


router.get('/delete/:id',function(req,res){
           //var d=req.params.name;
           //console.log(d);
           if(v=='admin1'){
           var query = "DELETE  FROM fileimage  WHERE fileimage_id ="+req.params.id+"";
           connection.query(query,function(err,data){

            if(err){
              console.log('error');
            }
            else{
              console.log('data deleted');
              res.redirect('/admin/admindisplay');

            }
           })
         }
         else
         {

dialog.info('you cannt delete');
res.send('you cannt delete');

          
         }
})

router.get('/logout',function(req, res){
	req.session.destroy(function(err){
		if(err) res.render('error', {message: err.message, error: err});
		else res.redirect('/admin/');
	})
})

module.exports = router;
