const fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');


var CSV_CONVERTER={

getAllTasks:function(){


var express = require('express');
var app = express();
var PORT = 3000;
/* req stands for request, res stands for response */
var rssobj;




	//console.log("oh hi mark");
	var data = fs.readFileSync(path.join(__dirname, '/uploads/cargill_csv.csv'), { encoding : 'utf8'});


var options = {
  delimiter : ',', // optional
  quote     : '"' // optional
};

	return(csvjson.toSchemaObject(data, options));

	
   

}
};
module.exports=CSV_CONVERTER;