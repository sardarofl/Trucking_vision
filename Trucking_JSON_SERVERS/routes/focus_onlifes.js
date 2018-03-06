var express = require('express');
var router = express.Router();
var focus_onlifes=require('../models/focus_onlife');

router.get('/:id?',function(req,res,next){

if(req.params.id){

  
}
else{

 focus_onlifes.getAllTasks(function(err,rows){

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