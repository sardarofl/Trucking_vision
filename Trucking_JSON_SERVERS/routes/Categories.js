var express = require('express');
var router = express.Router();
var Categories=require('../models/Categorie');

router.get('/:id?',function(req,res,next){

if(req.params.id){


}
else{

 Categories.getAllTasks(function(err,rows){

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
