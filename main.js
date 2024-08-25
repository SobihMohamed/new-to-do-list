// !? check if the task is already exist => done
// !? check empty input => sweet alert => sweet alert =>done
// ! delet all and finish all



// ? variables
let input=document.querySelector(".inp");
let add_but=document.querySelector(".add_task .add");
let tasks_count_num =document.querySelector(".tasks-state .tasks_count span");
let completed_tasks_num =document.querySelector(".tasks-state .completed_tasks span");
let tasks_content =document.querySelector(".tasks_content");

let deleteAll_but=document.querySelector(".delete_All");
let finishAll_but=document.querySelector(".finish_All");


let array_inpVal=[];
let task_count=0;
let completed_count=0;

// ? foucus on input
window.onload=function(){
    input.focus();
}

// ? appear msg
createnoTasksMsg();

// ? Add tasks
add_but.onclick = function () {
    let No_tasks_message = document.querySelector(".no-tasks-message");
    let inputVal = input.value;
    
    // ? check if empty input
    if (input.value === "") {
        //! sweet alert
        swal("warning!", "No Tasks Written", "warning");
    } else {
        // ? add val to local storage
        
        // ? check if input exist
        let check = false;
        for (let i = 0; i < array_inpVal.length; i++) {
            if (array_inpVal[i] === inputVal) {
                check = true;
                break;
            }
        }
        //? exist
        if (check) {
            swal("Error!?", "Task Already Exist", "error");
            input.value="";
        }
        // ? not exist 
        else {
            addToLocalStorage(inputVal);
            array_inpVal.push(inputVal);
            
            // ? check if the message is exist or not
            if (document.body.contains(No_tasks_message)) {
                // ? delete the message
                No_tasks_message.remove();
            }
            
            // ? create main span
            let M_sapn = document.createElement("span");
            
            // ? add class
            M_sapn.className = "task-box";
            
            // ? create text node of the main span
            let text_main_span = document.createTextNode(input.value);
            
            // ? add text to the main span
            M_sapn.appendChild(text_main_span);
            
            // ? create delete span
            let deleted_sapn = document.createElement("span");
            
            // ? add class
            deleted_sapn.className = "delete";
            
            // ? create text node of the main span
            let text_deleted = document.createTextNode("Delete");
            
            // ? add text to the deleted span
            deleted_sapn.appendChild(text_deleted);
            
            // ? add deleted span to main span
            M_sapn.appendChild(deleted_sapn);
            
            // ? add main span to the container
            tasks_content.appendChild(M_sapn);
            
            // ?inc num tasks
            num_Tasks_inc();
            
            // ? make input value to be empty
            input.value = "";
            // ? foucus on input
            input.focus();
        }
    }
};

document.addEventListener("click",function(e){
    // ? delete task
    if(e.target.className===`delete`){
        e.target.parentNode.remove();
        // ? check if deleted is finished then dec the num 
        if(e.target.parentNode.classList.contains(`finished`)){
            num_complete_Tasks_dec();
        }
        // ? dec num tasks
        num_Tasks_dec();
        if(tasks_content.childElementCount==0){
            createnoTasksMsg();
        }
    }
    // ? finished task
    if(e.target.classList.contains(`task-box`)){
        // ? if exist remove if not add
        e.target.classList.toggle("finished");
        // ? inc and dec completed tasks
        if(e.target.classList.contains(`finished`)){
            // ? inc complete task
            num_complete_Tasks_inc();
        }else{
            // ? dec completed tasks
            num_complete_Tasks_dec();
        }
    }
})

function createnoTasksMsg(){
    // ? create span
    let msg_span=document.createElement("span");
    // ? create class
    msg_span.classList.add("no-tasks-message");
    // ? create text of span
    let text_Msg=document.createTextNode("No Tasks To Show");
    // ? append text
    msg_span.appendChild(text_Msg);
    // ? append element
    tasks_content.appendChild(msg_span);
    
}

// ? func num tasks inc & dec
function num_Tasks_inc(){
    task_count++;
    tasks_count_num.textContent=`${task_count}`;
}
function num_Tasks_dec(){
    task_count--;
    tasks_count_num.textContent=`${task_count}`;
}

// ? func inc comp tasks and dec tasks
function num_complete_Tasks_inc(){
    completed_count++;
    completed_tasks_num.textContent=`${completed_count}`;
}
function num_complete_Tasks_dec(){
    completed_count--;
    completed_tasks_num.textContent=`${completed_count}`;
}

// ? buts
deleteAll_but.onclick=function(){
    const tasks_delete = tasks_content.querySelectorAll(".task-box");
    tasks_delete.forEach(ele => {
        ele.remove();
    });
    if (document.body.contains(No_tasks_message)) {
        // ? delete the message
        No_tasks_message.remove();
    }
    tasks_count_num.textContent=`0`;
    completed_tasks_num.textContent=`0`;
}

finishAll_but.onclick=function(){
    const tasks_finish = tasks_content.querySelectorAll(".task-box");
    tasks_finish.forEach(ele => {
        ele.classList.add("finished");
    });
    completed_tasks_num.textContent=`${tasks_finish.length}`;

}

// ? add tasks to local storage
let count=1;
function addToLocalStorage(inputVal) {
    window.localStorage.setItem(`Task ${count}`,inputVal);
    count++;
}
