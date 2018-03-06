var db=require('../dbconnection');

var Product={

getAllTasks:function(callback){

return db.query("Select * from products",callback);

},
getTaskById:function(id,callback){

    return db.query("select * from task where Id=?",[id],callback);
},
addTask:function(DentTracker,callback){
   console.log("inside service");
   console.log(DentTracker.Id);
return db.query("Insert into task values(?,?,?)",[DentTracker.Id,DentTracker.Title,DentTracker.Status],callback);
//return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
},
deleteTask:function(id,callback){
    return db.query("delete from task where Id=?",[id],callback);
},
updateTask:function(id,DentTracker,callback){
    return  db.query("update task set Title=?,Status=? where Id=?",[DentTracker.Title,DentTracker.Status,id],callback);
},
deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from task where Id in (?)",[delarr],callback);
}
};
module.exports=Product;
