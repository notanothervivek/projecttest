$(document).ready(async function () {


    await get_tasks_for_history_page_if_they_exist()
    


})   





async function get_tasks_for_history_page_if_they_exist(){
    return new Promise(async (resolve, reject) => {
  
  
      let respfromdb=await db_get_history_tasks()
  
  let all_tasks=respfromdb.rows
  
      if(all_tasks.length){
      
      for(let i=0;i<all_tasks.length;i++){
        let tmdoc=all_tasks[i]
        let this_el=tmdoc.doc
       
        if(this_el.task_type==1 && this_el.task_priority==1){
  
          let new_elem= get_task_not_must_element_for_history_page(this_el.task_name,this_el._id)
    
          $("#tasksNotMustHistoryDisplayContainer").append(new_elem)
        }
       else if(this_el.task_type==1 && this_el.task_priority==2){
  
        let new_elem= get_task_not_nice_element_for_history_page(this_el.task_name,this_el._id)
    
        $("#tasksNotNiceHistoryDisplayContainer").append(new_elem)
        }
        else if(this_el.task_type==2 && this_el.task_priority==1){
  
          let new_elem= get_task_do_must_element_for_history_page(this_el.task_name,this_el._id)
    
          $("#tasksDoMustHistoryDisplayContainer").append(new_elem)
        }
        else if(this_el.task_type==2 && this_el.task_priority==2){
  
          let new_elem= get_task_do_nice_element_for_history_page(this_el.task_name,this_el._id)
    
          $("#tasksDoNiceHistoryDisplayContainer").append(new_elem)
        }
  
  
      }
      
      resolve()
      }
      else{
        $("#historyPageTasksMainContainer").append('<p id="historypageNoTasksMessage">There are no tasks completed yet</p>')
        resolve()
      }
      
    
  
    })
  }//get_goals_for_homepage_if_they_exist
  
  let classes_for_not_must="bg-gradient-to-r from-green-400 to-blue-500 active:from-pink-500 active:to-yellow-500" 
  let classes_for_not_nice="bg-gradient-to-r from-blue-400 to-red-500 active:from-red-500 active:to-green-500" 
  let classes_for_do_must="bg-gradient-to-r from-yellow-400 to-green-100 active:from-red-200 active:to-blue-500" 
  let classes_for_do_nice="bg-gradient-to-r from-pink-400 to-black-700 active:from-yellow-700 active:to-red-300" 
  
  function get_task_not_must_element_for_history_page(task_name,task_id){
   return `<div class="mt-2 w-full p-1">
    <div class="historySingleTaskBox p-1 rounded rounded-sm ${classes_for_not_must}" data-taskid="${task_id}" data-taskname="${task_name}">
     <div class="p-1 text-lg font-bold bg-white text-blue-500 rounded rounded-sm flex flex-row">
  <div class="taskNameBox">
  ${task_name}
  </div>
      </div>
    </div>
  </div>
  `
  
  }//get_task_not_must_element
  
  function get_task_not_nice_element_for_history_page(task_name,task_id){
  
    return `<div class="mt-2 w-full p-1">
    <div class="historySingleTaskBox p-1 rounded rounded-sm ${classes_for_not_nice}" data-taskid="${task_id}" data-taskname="${task_name}">
     <div class="p-1 text-lg font-bold  bg-white text-red-500 rounded rounded-sm flex flex-row">
  <div class="taskNameBox">
  ${task_name}
  </div>
      </div>
    </div>
  </div>
  `
  }//get_task_not_nice_element
  
  function get_task_do_must_element_for_history_page(task_name,task_id){
    return `<div class="mt-2 w-full p-1">
    <div class="historySingleTaskBox p-1 rounded rounded-sm ${classes_for_do_must}" data-taskid="${task_id}" data-taskname="${task_name}">
     <div class="p-1 text-lg font-bold  bg-white text-green-400 rounded rounded-sm flex flex-row">
  <div class="taskNameBox">
  ${task_name}
  </div>
      </div>
    </div>
  </div>
  `
  
  }//get_task_do_must_element
  
  function get_task_do_nice_element_for_history_page(task_name,task_id){
    return `<div class="mt-2 w-full p-1">
    <div class="historySingleTaskBox p-1 rounded rounded-sm ${classes_for_do_nice}" data-taskid="${task_id}" data-taskname="${task_name}">
     <div class="p-1 text-lg font-bold  bg-white text-black-500 rounded rounded-sm flex flex-row">
  <div class="taskNameBox">
  ${task_name}
  </div>
      </div>
    </div>
  </div>
  `
  
  }//get_task_do_nice_element
  
  
  
  