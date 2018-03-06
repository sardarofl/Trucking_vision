var express = require('express');
var router = express.Router();
var recognitions=require('../models/recognition');

router.get('/:id?',function(req,res,next){

if(req.params.id){


}
else{

 recognitions.getAllTasks(function(err,rows){

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
