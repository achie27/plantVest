const express = require('express');
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, './uploads')
	},
	filename: function (req, file, cb) {
	cb(null, file.originalname)
	}
})
 
var upload = multer({ storage: storage })
const app = express();

var images = [];

app.post('/images', upload.array('img', 20), (req, res) => {
	console.log(req.files);
	for(var x of req.files){
		images.push(x.originalname)
	}
	// console.log(req);
	// console.log(req.files)
	res.send({
		status : 1
	});
});

app.listen(5000, (err) => console.log('ayeee'));