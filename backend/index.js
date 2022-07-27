const express = require("express");
const bodyParser = require("body-parser");
//Importing tessetact_ocr module
const tesseract = require("node-tesseract-ocr")
//Importing jimp module
var Jimp = require("jimp");
// Importing filesystem module
var fs = require('fs')
// Importing qrcode-reader module
var qrCode = require('qrcode-reader')
//Importing multer module
const multer  = require('multer')
const upload = multer()
const path = require('path');

const app = express();

storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        return cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      
    }
  });

//ocrteseract and qr code scanner
 const config = {
  lang: "fra",
  oem: 1,
  psm: 3,
}

/*tesseract
  .recognize("test.png", config)
  .then((text) => {
    console.log("Result:", text)
  })
  .catch((error) => {
    console.log(error.message)
  })

  var buffer = fs.readFileSync(__dirname + '/qr.png');

// Parse the image using Jimp.read() method
Jimp.read(buffer, function(err, image) {
	if (err) {
		console.error(err);
	}
	// Creating an instance of qrcode-reader module
	let qrcode = new qrCode();
	qrcode.callback = function(err, value) {
		if (err) {
			console.error(err);
		}
		// Printing the decrypted value
		console.log(value.result);
	};
	// Decoding the QR code
	qrcode.decode(image.bitmap);
}); */

// Post files
app.post("/upload",multer({storage: storage})
.single('upload'), function(req, res) {
	  console.log(req.file);
	  console.log(req.body);
	  //res.redirect(req.file.filename);
	  console.log(req.file.filename);
	 // return res.status(200).end();
	 
tesseract
.recognize("./uploads/"+req.file.filename, config)
  .then((text) => {
    console.log("Result:", text)
	res.status(200).send(text);
  })
  .catch((error) => {
    console.log(error.message)
	res.status(400).send(error.message)
  })

	});
  
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
