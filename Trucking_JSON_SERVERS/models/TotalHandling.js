var db=require('../dbconnection');

var TotalHandling={

getAllTasks:function(callback){

return db.query("Select * from total_handling",callback);

},
getTaskById:function(id,callback){

    return db.query("select * from total_handling where Id=?",[id],callback);
},
addTask:function(TotalHandling,callback){
   console.log("inside service");
   console.log(TotalHandling.Id);
return db.query("Insert into task values(?,?,?)",[TotalHandling.Id,TotalHandling.Title,TotalHandling.Status],callback);
//return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
},
deleteTask:function(id,callback){
    return db.query("delete from task where Id=?",[id],callback);
},
updateTask:function(id,TotalHandling,callback){
    return  db.query("update task set Title=?,Status=? where Id=?",[TotalHandling.Title,TotalHandling.Status,id],callback);
},
deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from task where Id in (?)",[delarr],callback);
}
};
module.exports=TotalHandling;