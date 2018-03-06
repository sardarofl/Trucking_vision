var db=require('../dbconnection');

var LoadOut={

getAllTasks:function(callback){

return db.query("Select * from load_out",callback);

},
getTaskById:function(id,callback){

    return db.query("select * from task where Id=?",[id],callback);
},
addTask:function(LoadOut,callback){
   console.log("inside service");
   console.log(LoadOut.Id);
return db.query("Insert into task values(?,?,?)",[LoadOut.Id,LoadOut.Title,LoadOut.Status],callback);
//return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
},
deleteTask:function(id,callback){
    return db.query("delete from task where Id=?",[id],callback);
},
updateTask:function(id,LoadOut,callback){
    return  db.query("update task set Title=?,Status=? where Id=?",[LoadOut.Title,LoadOut.Status,id],callback);
},
deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from task where Id in (?)",[delarr],callback);
}
};
module.exports=LoadOut;