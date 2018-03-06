var express = require('express');
var router = express.Router();
var Measures=require('../models/Measure');

router.get('/:id?',function(req,res,next){

if(req.params.id){

  
}
else{

 Measures.getAllTasks(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
}
});

module.exports=router;