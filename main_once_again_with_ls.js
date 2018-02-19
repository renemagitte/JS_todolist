//const unmadeTaskList = document.getElementById('unmadeTaskList');

/* DOM Elements */

const completedTaskList = document.getElementById('completedTaskList');
const list = document.getElementById('list');
const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');
const removeAllTasksButton = document.getElementById('removeAllTasksButton');

var allTasks = [
//    {
//     task: 'Bygga ett altare tillägnat Paddy McAloon',
//    completed: false
//    }
];

function taskObj(task, completed){
    this.task = task;
    this.completed = completed;
}

/* Loads in stored tasks from local storage to array: */
allTasks = JSON.parse(localStorage.getItem('allTasks'));

/* Fetches allready existing items into page: */
fetchTaskListFromLocalStorage();


/*** Event Listeners (exists also inside createTaskRowElement-function) ***/

addTaskButton.addEventListener('click', function(){ 
    if(!(doubletCheck())){  
        saveTaskToArray();
        removeListElement(list); // clearing existing list...
        removeListElement(completedTaskList);
        //fetchTaskListFromArray();
// ****LS TEST****
        fetchTaskListFromLocalStorage();
// ****LS TEST****
    }
})

removeCompletedTasksButton.addEventListener('click', function(){ 
    removeCompletedTasksFromArray();
    removeListElement(list);
    removeListElement(completedTaskList);
    //fetchTaskListFromArray();
    fetchTaskListFromLocalStorage();
})

removeAllTasksButton.addEventListener('click', function(){ 
    removeAllTasksFromArray();
    removeListElement(list); // clearing existing list...
    removeListElement(completedTaskList);
    //fetchTaskListFromArray();
    fetchTaskListFromLocalStorage();
})

/* Functions */

function saveTaskToArray(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;
    addTaskInput.value = ''; // clear input field, thus preparing for next input
    var newTaskObj = new taskObj(newTask, false); // adding status: task != completed yet
    allTasks = JSON.parse(localStorage.getItem('allTasks'));
    allTasks.push(newTaskObj); 
    /* saving allTasks-array to local storage: */
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
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
    
    /* If task is equal to most recent added task in array, 
    it means it's new and deserves a fade in-animation: */
    var allTasksArrayForCheckingLastTask = JSON.parse(localStorage.getItem('allTasks'));
    if(allTasksArrayForCheckingLastTask[allTasksArrayForCheckingLastTask.length-1].task === taskParameter){ 
        checkDiv.classList.add('fadeIn');
    }
    
    taskDiv.classList.add('taskDiv');
    removeSingleTaskButton.classList.add('button_delete_single');
    removeSingleTaskButton.innerHTML = 'Delete';

    /*** Release of js-elements into DOM ***/
    
    /* Checking if task should go to incomplete or completed list: */
    if(status === false){
        list.appendChild(singleTaskWrapper);
    }else if(status === true){
        completedTaskList.appendChild(singleTaskWrapper);
    }

    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);

    /*** Filling the elements with dynamic content ***/
    checkDiv.innerHTML = trueOrFalse(status);
    //checkDiv.appendChild(completeTaskButton);
    taskDiv.innerHTML = taskParameter;
    taskDiv.appendChild(removeSingleTaskButton);

        checkDiv.addEventListener('click', function(){
            checkDiv.setAttribute("id", "checkAnimaionId");
            checkDiv.innerHTML = `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`;
                setTimeout(function (){
                  checkDiv.setAttribute("id", "checkAnimaionId2");
              }, 1400); 
              // the completeTask-function activates once the animation has played out:
              setTimeout(function (){
                  completeTask(index); 
              }, 2000);  
        }) 

        removeSingleTaskButton.addEventListener('click', function(){
            removeSingleTask(index);
            removeListElement(list);
            removeListElement(completedTaskList);
            //fetchTaskListFromArray();
            /*** LS TEST ***/
            fetchTaskListFromLocalStorage();
            /*** LS TEST ***/
        })
    
}

//function fetchTaskListFromArray(){
//    for(var i in allTasks){
//        var fetchTaskFromArray = allTasks[i].task;
//        var fetchStatusFromArray = allTasks[i].completed; 
//        var fetchTaskIndexFromArray = allTasks.indexOf(allTasks[i]);
//
//        createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
//    }
//}

// ****LS TEST****
function fetchTaskListFromLocalStorage(){
    
        dataFromLocalStorage = JSON.parse(localStorage.getItem('allTasks'));
    //alert(JSON.stringify(dataFromLocalStorage));
    
    for(var i = 0; i < dataFromLocalStorage.length; i++){
        
        //funkar om man har denna med:

        
//        console.log(dataFromLocalStorage[i].task);
//        console.log(dataFromLocalStorage[i].completed);
//        console.log(dataFromLocalStorage.indexOf(dataFromLocalStorage[i]));
        
        var fetchTaskFromArray = dataFromLocalStorage[i].task;
        var fetchStatusFromArray = dataFromLocalStorage[i].completed; 
        var fetchTaskIndexFromArray = dataFromLocalStorage.indexOf(dataFromLocalStorage[i]);

       createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
        
        //alert(fetchTaskFromArray);

        // funkar!!!
//        var hej = JSON.parse(localStorage.getItem('allTasks'));
//        console.log(hej[i].task);


    }

}
// ****LS TEST****

function completeTask(index) {
    allTasks[index].completed = true;
    
// ****LS TEST****
    //updating localstorage 
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
// ****LS TEST****
    removeListElement(list); // clearing existing list...
    removeListElement(completedTaskList);
//    fetchTaskListFromArray();
    
// ****LS TEST****
        fetchTaskListFromLocalStorage();
// ****LS TEST****
    
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
    allTasks = allTasks.filter(filterFunctionTest); 
    
    //updating localstorage 
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function filterFunctionTest(hej){
    return hej.completed === false;
}

function removeAllTasksFromArray(status){
    allTasks = [];
    //updating localstorage 
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
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