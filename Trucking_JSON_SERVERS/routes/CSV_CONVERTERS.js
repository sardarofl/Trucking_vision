var express = require('express');
var router = express.Router();
var CSV_CONVERTERS=require('../models/CSV_CONVERTER');

router.get('/:id?',function(req,res,next){

res.json(CSV_CONVERTERS.getAllTasks());

});

module.exports=router;