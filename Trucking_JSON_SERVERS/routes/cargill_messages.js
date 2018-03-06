var express = require('express');
var router = express.Router();
var cargill_messages=require('../models/cargill_message');

router.get('/:id?',function(req,res,next){

if(req.params.id){


}
else{

 cargill_messages.getAllTasks(function(err,rows){

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
