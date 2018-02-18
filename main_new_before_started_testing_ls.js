//const unmadeTaskList = document.getElementById('unmadeTaskList');

/* DOM Elements */

const completedTaskList = document.getElementById('completedTaskList');
const list = document.getElementById('list');
const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');
const removeAllTasksButton = document.getElementById('removeAllTasksButton');

var allTasks = [
    {
     task: 'Bygga ett altare tillägnat Paddy McAloon',
    completed: false
    }
];

function taskObj(task, completed){
    this.task = task;
    this.completed = completed;
}

/* Event Listeners (exists also inside createTaskRowElement-function) */

addTaskButton.addEventListener('click', function(){ 
    if(!(doubletCheck())){  
        saveTaskToArray();
        removeListElement(list); // clearing existing list...
        removeListElement(completedTaskList);
        fetchTaskListFromArray(); // ...so array can be looped out again with new task included
    }
})

removeCompletedTasksButton.addEventListener('click', function(){ 
    removeCompletedTasksFromArray();
    removeListElement(list);
    removeListElement(completedTaskList);
    fetchTaskListFromArray();
})

removeAllTasksButton.addEventListener('click', function(){ 
    removeAllTasksFromArray();
    removeListElement(list); // clearing existing list...
    removeListElement(completedTaskList);
    fetchTaskListFromArray();
})

/* Functions */

function saveTaskToArray(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;
    addTaskInput.value = ''; // clear input field, thus preparing for next input
    var newTaskObj = new taskObj(newTask, false); // adding status: task != completed yet
    allTasks.push(newTaskObj);  
}

function createTaskRowElement(taskParameter, status, index){
    /* Creating DOM elements... */ 
    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
    const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???

    /* ...add classes/styling to these elements... */    
    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv');
    taskDiv.classList.add('taskDiv');
    // If task is equal to most recent added task in array, it means it's new and deserves a fade in-animation:
    if(allTasks[allTasks.length-1].task === taskParameter){
        checkDiv.classList.add('fadeIn');
    }

    /* Release of js-elements into DOM */
    // Checking if task should go to incomplete or completed list 
    if(status === false){
        list.appendChild(singleTaskWrapper);
    }else if(status === true){
        completedTaskList.appendChild(singleTaskWrapper);
    }

    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);

    /* Filling the elements with dynamic content */
    checkDiv.innerHTML = trueOrFalse(status);
    //checkDiv.appendChild(completeTaskButton);
    taskDiv.innerHTML = taskParameter;
    taskDiv.appendChild(removeSingleTaskButton);
            removeSingleTaskButton.classList.add('button_delete');
            removeSingleTaskButton.setAttribute("value", "Delete");

        checkDiv.addEventListener('click', function(){
            checkDiv.setAttribute("id", "checkAnimaionId");
            checkDiv.innerHTML = `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`;
            
                setTimeout(function (){
                  checkDiv.setAttribute("id", "checkAnimaionId2");
              }, 1400); 
            
              setTimeout(function (){
                  completeTask(index); 
              }, 2000);  
        }) 

        removeSingleTaskButton.addEventListener('click', function(){
            removeSingleTask(index);
            removeListElement(list);
            removeListElement(completedTaskList);
            fetchTaskListFromArray();
        })
    
}

function fetchTaskListFromArray(){
    for(var i in allTasks){
        var fetchTaskFromArray = allTasks[i].task;
        var fetchStatusFromArray = allTasks[i].completed; 
        var fetchTaskIndexFromArray = allTasks.indexOf(allTasks[i]);

        createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
    }
}


function completeTask(index) {
    allTasks[index].completed = true;
    removeListElement(list); // clearing existing list...
    removeListElement(completedTaskList);
    fetchTaskListFromArray();
}

function removeListElement(listToRemove){
    while(listToRemove.hasChildNodes()){
        listToRemove.removeChild(listToRemove.lastChild)
    }
}

function removeSingleTask(index) {
    allTasks.splice(index, 1);
}

//buggig funktion?????!!!:
function removeCompletedTasksFromArray(){
    for (i = 0; i <= allTasks.length; i++) {

        if(allTasks[i].completed = true){ 
            
            //removeSingleTask(i);
            
            allTasks.splice(allTasks[i], 1); 
            //allTasks.splice(i); 
            
        } 
    }
}

function removeAllTasksFromArray(status){
    allTasks = [];
}

function doubletCheck(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;
    
    for (i = 0; i < allTasks.length; i++) {
            if(!(newTask === allTasks[i].task)){
                return false;
            }else{
                alert(`
                Sorry, there can't be two identical tasks. 
                But don't worry, you'll add a better one. 
                There are plenty of tasks in the sea!
                `);  
                return true;
            }
    }  
}

function trueOrFalse(status){
        if(status === false){
        return `<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span>`;
        }else if(status === true){
        return `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`; 
        }
}