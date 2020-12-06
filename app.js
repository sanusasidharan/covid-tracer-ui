const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
var parser = require('body-parser');
var fs=require('fs');
var spawn = require("child_process").spawn;

const request = require('request');
const Stream = require('stream').Transform;
const { response } = require('express');
const tempService = process.env.PY_ENDPOINT || "http://192.168.43.138:8000"
const tempCalc = `${tempService}/api/temp`
const imageCrop=`${tempService}/api/crop`
const PPG=`${tempService}/api/bpm`
const getCropped=`${tempService}/cropped/`


const absolutePath = path.join(__dirname,'public/uploads/');
const croppedPath=path.join(__dirname,'public/uploads/cropped/');
const publicPath = path.join(__dirname,'public');

function getPersonIdentified(Image,hbeat,bpm,response1,res){
	const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
	const { IamAuthenticator } = require('ibm-watson/auth');
	const visualRecognition = new VisualRecognitionV3({
	  version: '2018-03-19',
	  authenticator: new IamAuthenticator({
		apikey: 'PBgZZvV0uCxMALG95Cf1yh_C1prfcgF8ztEn-pNpRTUe',
	  }),
	  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/61d41d02-cb88-4443-aa6d-b5108887ef0a',
	});
	const classifyParams = {
	  imagesFile: fs.createReadStream(croppedPath+Image),
	  owners: ['me'],
	  threshold: 0.6,
	  classifierIds: ['EmployeeIdentification_2040637369'],
	};
	visualRecognition.classify(classifyParams)
	  .then(response => {
		const classifiedImages = response.result;
		
	  var name="";
	 var score=0;
	 var classes = classifiedImages.images[0].classifiers[0].classes
	 if(classes.length==0){
	  name='not identified'
	  score='not identified'
	}
	else{
	  name=classes[0].class
		score=classes[0].score
	}
	console.log(res)
		if(res>38.0){
			sendNotification(name, res, "Covid suspect")
		  response1.render('output', {
		  
			file:`/uploads/cropped/${Image}`,
			Name:name,
			Score:score,
			Temperature:Math.round((res+ Number.EPSILON) * 100) / 100+"C",
			HeartBeat:hbeat,
			OxygenRate:bpm,
			msg: "Covid +ve",
		  }) 
		}
		else{
		
		response1.render('output', {
		  file:`/uploads/cropped/${Image}`,
			Name:name,
			Score:score,
			Temperature:Math.round((res + Number.EPSILON) * 100) / 100+"C",
			HeartBeat:hbeat,
			OxygenRate:bpm,
			msg: "Covid -ve",
			})
	  }
		
	
	  })
	  .catch(err => {
		console.log('error:', err);
	  });
	}

// for calling IBM function for notification
function sendNotification(ename,etemp, ecomment){
   request.post('https://eu-gb.functions.appdomain.cloud/api/v1/web/sanu_s%40infosys.com_dev/Thermovid-functions/SendNotification', {
     json: {
        name: ename,
        temp: etemp,
        remark: ecomment
     }
   }, (error, res, body) => {
     if (error) {
      console.error(error)
      return
     }
     console.log(`statusCode: ${res.statusCode}`)
     // 204 is expected
     return res.statusCode;
   })
} 
 


function getTemperature(imgName,hbeat,bpm,response)
{
	imageTosearch = imgName
 const formData = {
   filename: imageTosearch,
   file: fs.createReadStream(croppedPath + imgName),
 };
 console.log("hitting : "+tempCalc);
 request.post({url: tempCalc , formData: formData}, function optionalCallback(error, res, body) {
   if (error) {
  return console.error('upload failed:', error);
   }
 body  = JSON.parse(body);
 
 
   getPersonIdentified(imgName,hbeat,bpm,response,body.temperature);
 });
} 
 
function getImageCropped(imgName,response)
{
	
	console.log("hitting : "+imageCrop);
request.post(imageCrop , {
   json: {
     filename: imgName
   }
 }, function optionalCallback(error, res, body) {
 if (error) {
  return console.error('upload failed:', error);
 }

console.log(body)
console.log(res.body)
 // body = JSON.parse(res.body);
 console.log('======================= ');
   imgName  =  body.filename;
 response.render('submit', {
  msg: 'File Uploaded and face cropped!',
  file: 'uploads/cropped/'+imgName,
     filename: imgName,
HeartBeat:body.heartbeat,
Bpm:body.oxygenRate,
csvLoc:body.csvLoc,

     
   });
 }); 
 

}


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: absolutePath,
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('Image');


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  //const filetypes = /jpeg|jpg|png|gif/;
  const filetypes = /mp4|avi/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Video Only!');
  }
}

// Init app
const app = express();
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('public'));

app.get('/', (req, res) => res.render('welcome'));
app.post('/', (req, res) => {
  res.render('welcome')
});

app.post('/uploadImage', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('welcome', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('welcome', {
          msg: 'Error: No File Selected!'
        });
      } else {
		console.log('getting cropped img');
		console.log(req.file.filename)
		getImageCropped(req.file.filename,res);
		
		
      }
    }
  });
});

app.post('/uploadanother', (req, res) => {
  res.render('welcome')
});


app.post('/upload/process', (req, res) => {
    console.log('getting temperature');
  getTemperature(req.body.fname,req.body.hbeat,req.body.bpm,res);
})
 
var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// start server on the specified port and binding host
app.listen(server_port, server_ip_address, function() {
  // print a message when the server starts listening
  console.log( "Listening on http://" + server_ip_address + ":" + server_port )
});