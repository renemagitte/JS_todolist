
/*** DOM Elements ***/
const completedTaskList = document.getElementById('completedTaskList');
const incompletedTaskList = document.getElementById('incompletedTaskList');
const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');
const removeAllTasksButton = document.getElementById('removeAllTasksButton');



/*** Various important stuff ***/

var allTasks = [];
    
function TaskObj(task, completed){
    this.task = task;
    this.completed = completed;
}

if(!(localStorage.length === 0)){
    allTasks = JSON.parse(localStorage.getItem('allTasks')); /* Loads in stored tasks from local storage to array: */
}

if(!(allTasks.length === 0)){ 
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    fetchTaskListFromLocalStorage(); /* Fetches allready existing items into page: */
}

    /* If above not working, try this: */
    /*
      if(!localStorage.getItem('allTasks')){
          localStorage.setItem('allTasks', JSON.stringify([]));
      }
    */

var lastActiveTask; /* declaring variable for saving task of latest added OR checked task */


/*** Event Listeners (exists also inside createTaskRowElement-function) ***/

addTaskButton.addEventListener('click', function(){ 

        var isThisADoublet = doubletCheck();
    
        if(isThisADoublet === false){
            saveTaskToArray();
            removeListElement(incompletedTaskList);
            removeListElement(completedTaskList);
            fetchTaskListFromLocalStorage();
        }
})

removeCompletedTasksButton.addEventListener('click', function(){ 
    removeCompletedTasksFromArray();
    removeListElement(incompletedTaskList);
    removeListElement(completedTaskList);
    fetchTaskListFromLocalStorage();
})

removeAllTasksButton.addEventListener('click', function(){ 
    removeAllTasksFromArray();
    removeListElement(incompletedTaskList);
    removeListElement(completedTaskList);
    fetchTaskListFromLocalStorage();
})



/*** Functions ***/

function saveTaskToArray(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;
    lastActiveTask = addTaskInput.value; /* saving task to variable for later comparision */
    addTaskInput.value = ''; /* clear input field, thus preparing for next input */
    var newTaskObj = new taskObj(newTask, false); /* adding status: task != completed yet */
    //allTasks = JSON.parse(localStorage.getItem('allTasks'));
    allTasks.push(newTaskObj); 
    localStorage.setItem('allTasks', JSON.stringify(allTasks)); /* saving allTasks-array to local storage: */
}

function fetchTaskListFromLocalStorage(){
    
    dataFromLocalStorage = JSON.parse(localStorage.getItem('allTasks'));

    for(let i = 0; i < dataFromLocalStorage.length; i++){
        var fetchTaskFromArray = dataFromLocalStorage[i].task;
        var fetchStatusFromArray = dataFromLocalStorage[i].completed; 
        var fetchTaskIndexFromArray = dataFromLocalStorage.indexOf(dataFromLocalStorage[i]);

       createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
    }
}

function createTaskRowElement(taskParameter, status, index){
    
    /*** Creating DOM elements... ***/ 
    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
    const removeSingleTaskButton = document.createElement("button");

    /*** ...add classes/styling to these elements... ***/    
    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv'); 
    /* if last added OR completed, it deserves fadeIn-style: */
    if(lastActiveTask === taskParameter){ 
        checkDiv.classList.add('fadeIn');
    }
    taskDiv.classList.add('taskDiv');
    removeSingleTaskButton.classList.add('button_delete_single');
    removeSingleTaskButton.innerHTML = 'Delete';

    /*** ...Release of js-elements into DOM... ***/
    /* Checking if task should go to incomplete or completed list: */
    if(status === false){
        incompletedTaskList.appendChild(singleTaskWrapper);
    }else if(status === true){
        completedTaskList.appendChild(singleTaskWrapper);
    }
    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);

    /*** ...Filling the elements with dynamic content ***/
    checkDiv.innerHTML = trueOrFalseCheckPicture(status);
    taskDiv.innerHTML = taskParameter;
    taskDiv.appendChild(removeSingleTaskButton);

        checkDiv.addEventListener('click', function(){
            checkDiv.setAttribute("id", "checkAnimaionId");
            checkDiv.innerHTML = `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`;
                setTimeout(function (){
                  checkDiv.setAttribute("id", "checkAnimaionId2");
              }, 1400); 
              /* the completeTask-function activates once the animation has played out: */
              setTimeout(function (){
                  completeTask(index); 
              }, 2000);  
        }) 

        removeSingleTaskButton.addEventListener('click', function(){
            removeSingleTask(index);
            removeListElement(incompletedTaskList);
            removeListElement(completedTaskList);
            fetchTaskListFromLocalStorage();
        })    
}

function completeTask(index) {
    allTasks[index].completed = true;
    lastActiveTask = allTasks[index].task; /* store task for comparing later */
    localStorage.setItem('allTasks', JSON.stringify(allTasks)); /* updating localstorage */
    removeListElement(incompletedTaskList);
    removeListElement(completedTaskList);
    fetchTaskListFromLocalStorage();
}

function removeListElement(listToRemove){
    while(listToRemove.hasChildNodes()){
        listToRemove.removeChild(listToRemove.lastChild)
    }
}

function removeSingleTask(index) {
    allTasks.splice(index, 1);
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function removeCompletedTasksFromArray(){
    allTasks = allTasks.filter(filterFalseOnly); 
    localStorage.setItem('allTasks', JSON.stringify(allTasks)); /* updating localstorage */
}

function filterFalseOnly(array){
    return array.completed === false;
}

function removeAllTasksFromArray(status){
    allTasks = [];
    localStorage.setItem('allTasks', JSON.stringify(allTasks)); /* updating localstorage */
}

function doubletCheck(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;

    localStorage.setItem('allTasks', JSON.stringify(allTasks)); 
    localStorageParseVariable = JSON.parse(localStorage.getItem('allTasks'));
    
    if(!(localStorageParseVariable === null)){

        for(let i = 0; i < localStorageParseVariable.length; i++){
            var taskToCompare = localStorageParseVariable[i].task;
            if(newTask === taskToCompare){
                alert(`
                Sorry, there can't be two identical tasks. 
                But don't worry, you'll add a better one. 
                There are plenty of tasks in the sea!
                `);  
                return true;
            }
        }
        return false;
    }
}

function trueOrFalseCheckPicture(status){
        if(status === false){
        return `<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span>`;
        }else if(status === true){
        return `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`; 
        }
}
