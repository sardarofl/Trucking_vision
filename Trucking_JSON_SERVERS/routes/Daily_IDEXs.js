var express = require('express');
var router = express.Router();
var Daily_IDEXs=require('../models/Daily_IDEX');

router.get('/:id?',function(req,res,next){

if(req.params.id){


}
else{

 Daily_IDEXs.getAllTasks(function(err,rows){

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
