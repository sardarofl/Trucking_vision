var express = require('express');
var router = express.Router();
var DentTrackers=require('../models/DentTracker');

router.get('/:id?',function(req,res,next){

if(req.params.id){

  
}
else{

 DentTrackers.getAllTasks(function(err,rows){

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