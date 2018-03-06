var express = require('express');
var router = express.Router();
var Products=require('../models/Product');

router.get('/:id?',function(req,res,next){

if(req.params.id){


}
else{

 Products.getAllTasks(function(err,rows){

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
