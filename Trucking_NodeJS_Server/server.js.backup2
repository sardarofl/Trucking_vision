var express   = require('express');


var mysql = require('mysql');
var multer  =   require('multer');
var path = require('path');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'trucking'
	});
var app = express();
//static lockfileVersion
//app.use(express.static('/Pages'));
//console.log(__dirname + './Pages');
 app.use(express.static(__dirname));


 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

	var filename_path;
	var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, './uploads');
	  },
	  filename: function (req, file, callback) {
			filename_path=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
	    callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
	  }
	});

	var upload = multer({ storage : storage}).single('image');
	app.post('/add_product',function(req,res){

	var body = req.body.body;

	//var image = req.file.filename;

	    upload(req,res,function(err) {
				var item = req.body.data[0].item;
				var pass = req.body.data[1].item;
				console.log(item);
				console.log(pass);
				console.log(filename_path);
				var data = {
					"Data":""
				};

					connection.query("INSERT INTO categories (`category_name`, `image`,`image_path`) VALUES ('"+item+"','"+pass+"','"+filename_path+"')", function (err, result) {
						if (err) throw err;
						//	 res.json(data);
					});

	        if(err) {
								console.log(err);
	            return res.end("Error uploading file.");

	        }
						console.log('File uploaded');
	        res.end("File is uploaded");

	    });
	});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to GET & POST request Demo..";

	res.json(data);
});*/

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Pages/Categories.html'));
  //__dirname : It will resolve to your project folder.
});


app.get('/edit',function(req,res){

  res.sendFile(path.join(__dirname+'/Pages/edit_product.html'));

});


app.get('/fetch_categories',function(req,res){
	connection.query("SELECT * from categories",function(err, rows, fields){
		if(rows.length != 0){
			res.json(rows);
		}else{
		//	data["Data"] = 'No data Found..';
		//		res.json(data);
		}
	});
});



	app.delete('/delete_category/:id',function(req, res){
		//Todo.find({item:req.params.id.replace(/\-/g, " ")}).remove(function(err,data){
		var item = req.params.id;
		var data = {
			"Data":""
		};
		//DELETE FROM customers WHERE address = 'Mountain 21'
		//connection.query("INSERT INTO login (`email`, `password`) VALUES ('"+item+"','"+pass+"')", function (err, result) {
		connection.query("DELETE FROM categories WHERE id = '"+item+"'", function (err, result) {
	 	 if (err) throw err;
		 res.json(data);
	  });

	});

app.post('/login',function(req,res){
	var item = req.body.data[0].item;
	var pass = req.body.data[1].item;
	//console.log(req);
	var data = {
		"Data":""
	};

	  connection.query("INSERT INTO categories (`category_name`, `image`) VALUES ('"+item+"','"+pass+"')", function (err, result) {
	    if (err) throw err;
			//data["Data"] = "Successfully inserted data";
			 res.json(data);
		//	console.log(data);
	   // res.render('login',{login:data});
	  });

///////////////////ypload


});


/* THIS FUNCTION IS TO USE EJS */ /*which I find no reason to use actually
app.get('/log',function(req, res,err){

	var data = {
		"Data":""
	};

	connection.query("SELECT * from testing",function(err, rows, fields){
		if(rows.length != 0){
			//data["Data"] = rows;
				 if(err)throw err;
			res.render('login',{login:rows});

		}else{
		//	data["Data"] = 'No data Found..';
		res.render('login',{login:rows});

		}
	});

		//if(err)throw err;

});*/

app.listen(3000,function(){
	console.log(`Connected & Listen to 3000`);
});
