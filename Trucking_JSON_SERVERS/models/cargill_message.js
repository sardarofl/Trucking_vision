var db=require('../dbconnection');

var cargill_message={

getAllTasks:function(callback){

return db.query("Select * from cargill_messages",callback);

},
getTaskById:function(id,callback){

    return db.query("select * from task where Id=?",[id],callback);
},
addTask:function(DentIssue,callback){
   console.log("inside service");
   console.log(DentIssue.Id);
return db.query("Insert into task values(?,?,?)",[DentIssue.Id,DentIssue.Title,DentIssue.Status],callback);
//return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
},
deleteTask:function(id,callback){
    return db.query("delete from task where Id=?",[id],callback);
},
updateTask:function(id,DentIssue,callback){
    return  db.query("update task set Title=?,Status=? where Id=?",[DentIssue.Title,DentIssue.Status,id],callback);
},
deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from task where Id in (?)",[delarr],callback);
}
};
module.exports=cargill_message;
