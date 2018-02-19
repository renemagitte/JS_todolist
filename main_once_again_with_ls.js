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

/* Event Listeners (exists also inside createTaskRowElement-function) */

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
    
// ****LS TEST****
    //localStorage = localStorage.setItem('allTasks', JSON.stringify(allTasks));
    localStorage.setItem('allTasks', JSON.stringify(allTasks));

    console.log(localStorage);
// ****LS TEST****
    
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
            removeSingleTaskButton.classList.add('button_delete');  // fix these buttons
            removeSingleTaskButton.setAttribute("value", "Delete"); // fix these buttons

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
    
    for(var i = 0; i < localStorage.length; i++){
        
        //funkar om man har denna med:
        dataFromLocalStorage = JSON.parse(localStorage.getItem('allTasks'));
        
//        console.log(dataFromLocalStorage[i].task);
//        console.log(dataFromLocalStorage[i].completed);
//        console.log(dataFromLocalStorage.indexOf(dataFromLocalStorage[i]));
        
        var fetchTaskFromArray = dataFromLocalStorage[i].task;
        var fetchStatusFromArray = dataFromLocalStorage[i].completed; 
        var fetchTaskIndexFromArray = dataFromLocalStorage.indexOf(dataFromLocalStorage[i]);

       createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
        
    

        // funkar!!!
//        var hej = JSON.parse(localStorage.getItem('allTasks'));
//        console.log(hej[i].task);


    }

}
// ****LS TEST****

function completeTask(index) {
    allTasks[index].completed = true;
    
// ****LS TEST****
    
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    
//    dataFromLocalStorage = JSON.parse(localStorage.getItem('allTasks'));
//    
// ****LS TEST****
    // här ska jag sätta specifik task till true i LS
    //localStorage.setItem('allTasks[index].completed', JSON.stringify(allTasks)) = true;
    
    //JSON.parse(localStorage.taskObj[index].completed) = true;
    
//localStorage.setItem('completed', JSON.stringify(true));
//console.log(JSON.parse(localStorage.getItem('completed')));
//    console.log(localStorage);
    
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
}

function removeCompletedTasksFromArray(){
    allTasks = allTasks.filter(filterFunctionTest);  
}

function filterFunctionTest(hej){
    return hej.completed === false;
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