var express = require('express');
var router = express.Router();
var DentIssues=require('../models/DentIssue');

router.get('/:id?',function(req,res,next){

if(req.params.id){

  
}
else{

 DentIssues.getAllTasks(function(err,rows){

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