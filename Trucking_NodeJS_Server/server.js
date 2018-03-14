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
	app.post('/add_category',function(req,res){


	    upload(req,res,function(err) {
				var item = req.body.data[0].item;
				var pass = req.body.data[1].item;
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
	/////////add product
	app.post('/add_product',function(req,res){


			upload(req,res,function(err) {
				var item = req.body.data[0].item;
				var pass = req.body.data[1].item;
				var cat = req.body.data[2].item;
						var data = {
					"Data":""
				};
					console.log(item);
					console.log(pass);
					console.log(cat);

					connection.query("INSERT INTO products (`product_name`,`categorie`, `image`,`image_path`) VALUES ('"+item+"','"+cat+"','"+pass+"','"+filename_path+"')", function (err, result) {
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



app.get('/fetch_categories',function(req,res){
	connection.query("SELECT * from categories",function(err, rows, fields){
		if(rows.length != 0){
			res.json(rows);
		}else{
		}
	});
});

app.get('/fetch_products/:category',function(req,res){
	var category = req.params.category;
	//console.log(connection.query("SELECT * from products WHERE categorie='"+category+"'"));
	connection.query("SELECT * from products WHERE categorie='"+category+"'",function(err, rows, fields){
		if(rows.length != 0){
			res.json(rows);
		}else{
		}
	});
});

app.get('/fetch_products_media',function(req,res){
	connection.query("SELECT * from products_media",function(err, rows, fields){
		if(rows.length != 0){
			res.json(rows);
		}else{
		}
	});
});



	app.delete('/delete_category/:id',function(req, res){
			var item = req.params.id;
		var data = {
			"Data":""
		};
		connection.query("DELETE FROM categories WHERE id = '"+item+"'", function (err, result) {
	 	 if (err) throw err;
		 res.json(data);
	  });

	});

	app.delete('/delete_product/:id',function(req, res){
			var item = req.params.id;
		var data = {
			"Data":""
		};
		connection.query("DELETE FROM products WHERE id = '"+item+"'", function (err, result) {
	 	 if (err) throw err;
		 res.json(data);
	  });

	});



//paths
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Pages/Categories.html'));
});

app.get('/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/Pages/edit_product.html'));
});


app.listen(3000,function(){
	console.log(`Connected & Listen to 3000`);
});
