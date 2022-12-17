

$(document).ready(async function () {


 await get_tasks_for_homepage_if_they_exist()
 

 $(document).on('click', '.singleTaskBox ',async function () {

  let task_id=$(this).data("taskid")
  let task_name=$(this).data("taskname")

let resp=await  db_mark_task_as_done(task_id)

$(this).parent().remove()

$('#alertModalHeader').text('WooHOOOOOOOO')
$('#alertModalText').text('this is awesome')
$('#btnToOpenAlertBox').click()

  })
  
  
  $(document).on('click', '#createTaskFormSubmit',async function () {


    let createNewForm = $("#createNewTaskModal");
    
    let task_name=createNewForm.find('#createTaskFormName').val()
    let task_type = createNewForm.find("input[name=createTaskFormType]:checked").val();
    let task_priority = createNewForm.find("input[name=createTaskFormPriority]:checked").val();
    let task_frequency = createNewForm.find("input[name=createTaskFormFrequency]:checked").val();
    let task_deadline = createNewForm.find("input[name=createTaskFormDeadline]:checked").val();
    
    let respo= await db_add_new_task(task_name,task_type,task_priority,task_frequency,task_deadline)

    console.log('the response task id =',respo)


    if(task_type==1 && task_priority==1){

      let new_elem= get_task_not_must_element(task_name,respo)

      $("#tasksNotMustActiveDisplayContainer").append(new_elem)
    }
   else if(task_type==1 && task_priority==2){

    let new_elem= get_task_not_nice_element(task_name,respo)

    $("#tasksNotNiceActiveDisplayContainer").append(new_elem)
    }
    else if(task_type==2 && task_priority==1){

      let new_elem= get_task_do_must_element(task_name,respo)

      $("#tasksDoMustActiveDisplayContainer").append(new_elem)
    }
    else if(task_type==2 && task_priority==2){

      let new_elem= get_task_do_nice_element(task_name,respo)

      $("#tasksDoNiceActiveDisplayContainer").append(new_elem)
    }


    $('#createTaskFormName').val('')
$("input[name=createTaskFormType][value='2']").click() // .prop("checked",true);
$("input[name=createTaskFormPriority][value='1']").click() //.prop("checked",true);
     $("input[name=createTaskFormFrequency][value='1']").click() //.prop("checked",true);
   $("input[name=createTaskFormDeadline][value='1']").click() //.prop("checked",true);
  
   $('#homepageNoTasksMessage').html('')

   $('#createTaskFormCloseModal').click()
  return
  });
  
  

});


async function get_tasks_for_homepage_if_they_exist(){
  return new Promise(async (resolve, reject) => {


    let respfromdb=await db_get_all_active_tasks()

let all_tasks=respfromdb.rows

    if(all_tasks.length){
    
    for(let i=0;i<all_tasks.length;i++){
      let tmdoc=all_tasks[i]
      let this_el=tmdoc.doc
     
      if(this_el.task_type==1 && this_el.task_priority==1){

        let new_elem= get_task_not_must_element(this_el.task_name,this_el._id)
  
        $("#tasksNotMustActiveDisplayContainer").append(new_elem)
      }
     else if(this_el.task_type==1 && this_el.task_priority==2){

      let new_elem= get_task_not_nice_element(this_el.task_name,this_el._id)
  
      $("#tasksNotNiceActiveDisplayContainer").append(new_elem)
      }
      else if(this_el.task_type==2 && this_el.task_priority==1){

        let new_elem= get_task_do_must_element(this_el.task_name,this_el._id)
  
        $("#tasksDoMustActiveDisplayContainer").append(new_elem)
      }
      else if(this_el.task_type==2 && this_el.task_priority==2){

        let new_elem= get_task_do_nice_element(this_el.task_name,this_el._id)
  
        $("#tasksDoNiceActiveDisplayContainer").append(new_elem)
      }


    }
    
    resolve()
    }
    else{
      $("#homepageTasksMainContainer").append('<p id="homepageNoTasksMessage">There are no tasks yet</p>')
      resolve()
    }
    
  

  })
}//get_goals_for_homepage_if_they_exist

let classes_for_not_must="bg-gradient-to-r from-green-400 to-blue-500 active:from-pink-500 active:to-yellow-500" 
let classes_for_not_nice="bg-gradient-to-r from-blue-400 to-red-500 active:from-red-500 active:to-green-500" 
let classes_for_do_must="bg-gradient-to-r from-yellow-400 to-green-100 active:from-red-200 active:to-blue-500" 
let classes_for_do_nice="bg-gradient-to-r from-pink-400 to-black-700 active:from-yellow-700 active:to-red-300" 

function get_task_not_must_element(task_name,task_id){
 return `<div class="mt-2 w-full p-1">
  <div class="singleTaskBox p-1 rounded rounded-lg ${classes_for_not_must}" data-taskid="${task_id}" data-taskname="${task_name}">
   <div class="p-1 text-lg font-bold text-white rounded rounded-lg flex flex-row">
<div class="taskNameBox">
${task_name}
</div>
    </div>
  </div>
</div>
`

}//get_task_not_must_element

function get_task_not_nice_element(task_name,task_id){

  return `<div class="mt-2 w-full p-1">
  <div class="singleTaskBox p-1 rounded rounded-lg ${classes_for_not_nice}" data-taskid="${task_id}" data-taskname="${task_name}">
   <div class="p-1 text-lg font-bold text-white rounded rounded-lg flex flex-row">
<div class="taskNameBox">
${task_name}
</div>
    </div>
  </div>
</div>
`
}//get_task_not_nice_element

function get_task_do_must_element(task_name,task_id){
  return `<div class="mt-2 w-full p-1">
  <div class="singleTaskBox p-1 rounded rounded-lg ${classes_for_do_must}" data-taskid="${task_id}" data-taskname="${task_name}">
   <div class="p-1 text-lg font-bold text-white rounded rounded-lg flex flex-row">
<div class="taskNameBox">
${task_name}
</div>
    </div>
  </div>
</div>
`

}//get_task_do_must_element

function get_task_do_nice_element(task_name,task_id){
  return `<div class="mt-2 w-full p-1">
  <div class="singleTaskBox p-1 rounded rounded-lg ${classes_for_do_nice}" data-taskid="${task_id}" data-taskname="${task_name}">
   <div class="p-1 text-lg font-bold text-white rounded rounded-lg flex flex-row">
<div class="taskNameBox">
${task_name}
</div>
    </div>
  </div>
</div>
`

}//get_task_do_nice_element






function get_item_element(itemheader,itemTitle,itemDesc,btnText,itemParam,itemQty,itemID){

return `<div class="goalItemBox flex justify-center mt-4 w-3/4">
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300">
      ${itemheader}
    </div>
    <div class="p-6">
      <h5 class="text-gray-900 text-xl font-medium mb-2"> ${itemTitle}</h5>
      <p class="text-gray-700 text-base mb-4">
      ${itemDesc}
      </p>
      <button type="button" class="incrementGoalBtn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
      ${btnText}
      </button>
    </div>
    <div class="py-3 px-6 border-t border-gray-300 text-gray-600 text-center">
      <div class="itemBoxQuantity btn" id="item_${itemID}" data-itemid="${itemID}" data-param="${itemParam}" data-qty="${itemQty}">
      ${itemQty}
      </div>
    </div>
  </div>
</div>`


}//get_item_element