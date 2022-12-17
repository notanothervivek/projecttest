
let task_active_db = new PouchDB('taskActiveDB');

let task_done_db = new PouchDB('taskDoneDB');

let task_status_tracker_db = new PouchDB('taskStatusTrackerDB');

let task_for_recurring_db = new PouchDB('taskRecurringDB');

/*
goals_db.bulkDocs([
    {
      _id: '1',
     goal_title: 'kitten 1 ',
     goal_description: 'some kitten desc',
     quantity:9
    },
    {
      _id: '2',
      goal_title: 'kitten 2 ',
      goal_description: 'some kitten desc 2',
      quantity:95
    },
    {
      _id: '3',
      goal_title: 'kitten 3',
      goal_description: 'some kitten desc 3',
     quantity:3
    }
  ]);  //for prefilling data
*/


/*
  return new Promise(async (resolve, reject) => {
    try{

        .then(function (response) {
    // handle response
    resolve(1)
  }).catch(function (err) {
    console.log('add_single_goal err',err);
    reject(0)
  });
}catch(e){
    console.log('add_single_goal err 2 ',err);
    reject(0)
}

});
*/

async function db_add_new_task(name,type,priority,frequency,deadline){
    return new Promise(async (resolve, reject) => {
        try{
    let obj_to_add={}
    let tmpdate=Date.now()
    let new_id=' ' + tmpdate
    obj_to_add['_id']=new_id
    obj_to_add['task_name']=name 
    obj_to_add['task_type']=type
    obj_to_add['task_priority']=priority
    obj_to_add['task_frequency']=frequency
    obj_to_add['task_deadline']=deadline
    obj_to_add['task_status']=0
    //have if condition and use promise all , if the task is recurring, so that it can be added to the other database as well
   
            task_active_db.put(obj_to_add).then(function (response) {
        // handle response
        resolve(new_id)
      }).catch(function (err) {
        console.log('db_add_new_task err',err);
        reject(0)
      });
    }catch(e){
        console.log('db_add_new_task err 2 ',err);
        reject(0)
    }

    });


}//db_add_new_task

async function db_get_all_active_tasks(){
    return new Promise(async (resolve, reject) => {
        try{
            task_active_db.allDocs({
                include_docs: true,
                attachments: false
              })
            .then(function (docs) {
        // handle response
        resolve(docs)
      }).catch(function (err) {
        console.log('db_get_all_active_tasks err',err);
        reject(0)
      });
    }catch(e){
        console.log('db_get_all_active_tasks err 2 ',err);
        reject(0)
    }
    
    });
}//get_all_active_tasks

async function db_mark_task_as_done(task_id){
    return new Promise(async (resolve, reject) => {
        try{

    
            task_active_db.get(task_id).then(function (doc) {
                // update their age
              //  doc.status = 1;
              //  return db.remove(doc);
           
                // put them back
                db_move_task_to_done_db(doc).then(function (response) {
        // handle response
     
        db_delete_doc_form_active_task(task_id).then(function (response) {    
             resolve(1) 
        
        }).catch(function (err) {
            console.log('db_mark_task_as_done err 4',err);
            reject(0)
          })
    
      }).catch(function (err) {
        console.log('db_mark_task_as_done err',err);
        reject(0)
      })

    }).catch(function (err) {
        console.log('db_mark_task_as_done err 3',err);
        reject(0)
      });



    }catch(e){
        console.log('db_mark_task_as_done err 2 ',err);
        reject(0)
    }
    
    });

}//mark_task_as_done

async function db_delete_doc_form_active_task(task_id){

    return new Promise(async (resolve, reject) => {
        try{
        task_active_db.get(task_id).then(function (doc) {
       resolve(task_active_db.remove(doc))
      }).catch(function (err) {
        console.log('db_delete_doc_form_active_task err 3',err);
        reject(0)
      });
    }catch(e){
        console.log('db_delete_doc_form_active_task err 2 ',err);
        reject(0)
    }
    });
}//db_Delete_doc

async function db_move_task_to_done_db(doc){

    
    return new Promise(async (resolve, reject) => {
        try{
            let time=Date.now()
            let time_now=' ' + time
    let obj_to_add=doc
delete obj_to_add._rev
    obj_to_add['task_status']=1
    obj_to_add['task_completed_at']=time_now
    //have if condition and use promise all , if the task is recurring, so that it can be added to the other database as well
   
    task_done_db.put(obj_to_add).then(function (response) {
        // handle response
        resolve(1)
      }).catch(function (err) {
        console.log('db_move_task_to_done',err);
        reject(0)
      });
    }catch(e){
        console.log('db_move_task_to_done err 2 ',err);
        reject(0)
    }

    });


}//move_ask_to_done_db






async function db_get_history_tasks(){
    return new Promise(async (resolve, reject) => {
        try{
            task_done_db.allDocs({
                include_docs: true,
                attachments: false
              })
            .then(function (docs) {
        // handle response
        resolve(docs)
      }).catch(function (err) {
        console.log('db_get_history_tasks err',err);
        reject(0)
      });
    }catch(e){
        console.log('db_get_history_tasks err 2 ',err);
        reject(0)
    }
    
    });
  }//db_get_history_tasks

//========================================================================
/*
async function get_all_active_goals(){

    return new Promise(async (resolve, reject) => {
        try{
            goals_db.allDocs({
                include_docs: true,
                attachments: false
              })
            .then(function (docs) {
        // handle response
        resolve(docs)
      }).catch(function (err) {
        console.log('get_all_active_goals err',err);
        reject(0)
      });
    }catch(e){
        console.log('get_all_active_goals err 2 ',err);
        reject(0)
    }
    
    });
}//get_all_active_goals






    function increment_goal_quantity(item_id,new_qty){
        return new Promise(async (resolve, reject) => {
            try{
        
                goals_db.get(item_id).then(function (doc) {
                    // update their age
                    doc.quantity = new_qty;
                    // put them back
                   goals_db.put(doc).then(function (response) {
            // handle response
            resolve(1)
          }).catch(function (err) {
            console.log('increment_goal_quantity err',err);
            reject(0)
          })

        }).catch(function (err) {
            console.log('increment_goal_quantity err 3',err);
            reject(0)
          });



        }catch(e){
            console.log('add_single_goal err 2 ',err);
            reject(0)
        }
        
        });

    }//increment_goal_quantity



  function add_single_goal(item_id,goal_title,goal_desc){
    return new Promise(async (resolve, reject) => {
        try{
    goals_db.put({
        _id: item_id,
        goal_title: goal_title,
        goal_description:goal_desc,
        quantity:0
      }).then(function (response) {
        // handle response
        resolve(1)
      }).catch(function (err) {
        console.log('add_single_goal err',err);
        reject(0)
      });
    }catch(e){
        console.log('add_single_goal err 2 ',err);
        reject(0)
    }

    });
  }//add_single_goal


  function get_specific_goal(item_id){

      return new Promise(async (resolve, reject) => {
        try{
    
            goals_db.get(item_id).then(function (doc) {
        // handle response
        resolve(doc)
      }).catch(function (err) {
        console.log('get_specific_goal err',err);
        reject(0)
      });
    }catch(e){
        console.log('get_specific_goal err 2 ',err);
        reject(0)
    }
    
    });


  }//get_specific_goal

*/

