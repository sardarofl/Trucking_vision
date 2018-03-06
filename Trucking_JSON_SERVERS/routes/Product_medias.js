var express = require('express');
var router = express.Router();
var Product_medias=require('../models/Product_media');

router.get('/:id?',function(req,res,next){

if(req.params.id){


}
else{

 Product_medias.getAllTasks(function(err,rows){

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
