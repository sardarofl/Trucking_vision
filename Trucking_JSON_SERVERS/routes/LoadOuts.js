var express = require('express');
var router = express.Router();
var LoadOuts=require('../models/LoadOut');

router.get('/:id?',function(req,res,next){

if(req.params.id){

  
}
else{

 LoadOuts.getAllTasks(function(err,rows){

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