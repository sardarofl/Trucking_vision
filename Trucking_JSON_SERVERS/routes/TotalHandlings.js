var express = require('express');
var router = express.Router();
var TotalHandlings=require('../models/TotalHandling');

router.get('/:id?',function(req,res,next){

if(req.params.id){

  
}
else{

 TotalHandlings.getAllTasks(function(err,rows){

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