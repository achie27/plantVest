const express = require('express');
const multer = require('multer');
const spawn = require('child_process').spawn;

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

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var images = [];

app.post('/images', upload.array('img', 20), (req, res) => {
	images = [];
	console.log(req.files);
	for(var x of req.files){
		images.push(x.originalname)
	}
	// console.log(req.files)
	res.send({
		status : 1
	});
});

var detected_plants = [];
var all_plants = ["24. Bougainvillea sp", "1. Quercus suber", "10. Tilia tomentosa", "11. Acer palmaturu", "12. Celtis sp", "13. Corylus avellana", "14. Castanea sativa", "15. Populus alba", "16. Acer negundo", "17. Taxus bacatta", "18. Papaver sp", "19. Polypodium vulgare", "2. Salix atrocinerea", "20. Pinus sp", "21. Fraxinus sp", "22. Primula vulgaris", "23. Erodium sp", "25. Arisarum vulgare", "26. Euonymus japonicus", "27. Ilex perado ssp azorica", "28. Magnolia soulangeana", "29. Buxus sempervirens", "3. Populus nigra", "30. Urtica dioica", "31. Podocarpus sp", "32. Acca sellowiana", "33. Hydrangea sp", "34. Pseudosasa japonica", "35. Magnolia grandiflora", "36. Geranium sp", "37. Aesculus californica", "38. Chelidonium majus", "39. Schinus terebinthifolius", "4. Alnus sp", "40. Fragaria vesca", "5. Quercus robur", "6. Crataegus monogyna", "7. Ilex aquifolium", "8. Nerium oleander", "9. Betula pubescens"];
var plant_details = {
	"1. Quercus suber" : {
		"soil" : 'sandy',
		'animals' : ['sheep', 'cow', 'buffalo'],
	},
	"18. Papaver sp" : {
		"soil" : 'volcanic',
		"animals" : ["water buffalo", "finch", "rodents"]
	}
};

var soil_details = {
	"sandy" : "fertile",
	"dry" : "notfertile",
	"clay" : "fertile"
};

app.get('/results', (req, res) => {
	console.log(images);
	var p = spawn('python3', ['./getClass.py'].concat(images));
	var s = "";

	p.stdout.on('data', (data) => {
		s = s + data.toString();
	});

	p.stdout.on('end', (err) => {
		console.log(s);
		detected_plants = s.split('end');
		console.log(detected_plants);

		var possible_soil = [], possible_animals = [];
		for(var x of detected_plants){
			console.log(x);
			if(possible_soil.indexOf(plant_details[x].soil) == -1)
				possible_soil.push(plant_details[x].soil);
			
			possible_animals.concat(plant_details[x].animals);
		}

		possible_animals = possible_animals.filter(function(item, pos) {
		    return possible_animals.indexOf(item) == pos;
		})

		var cnt = 0;
		for(var x of possible_soil){
			if(soil_details[x] == 'fertile')
				cnt++;
		}

		var fit = 0;
		if(cnt > possible_soil.length/2)
			fit = 1;

		res.send({
			"soil" : possible_soil,
			"animals" : possible_animals,
			"fit" : fit
		});
	});

	
});

app.listen(5000, (err) => console.log('ayeee'));
