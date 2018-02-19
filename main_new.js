//const unmadeTaskList = document.getElementById('unmadeTaskList');

/* DOM Elements */

const completedTaskList = document.getElementById('completedTaskList');
const list = document.getElementById('list');
const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');
const removeAllTasksButton = document.getElementById('removeAllTasksButton');

//var allTasks = [];
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
        //funkar jättebra men provar ls istället:
        //fetchTaskListFromArray(); // ...so array can be looped out again with new task included
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
    //localStorage.setItem('newTaskObj', JSON.stringify(newTaskObj));
    
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    
    
    
// ****LS TEST****
    
}

function createTaskRowElement(task, status, index){
    /* Creating DOM elements... */ 
    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
        //checkDiv.setAttribute("id", "checkAnimaionId");
        //checkDiv.classList.add('checkAnimaionId');
    const taskDiv = document.createElement('div');
    const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
            removeSingleTaskButton.classList.add('button_delete');
            removeSingleTaskButton.setAttribute("value", "Delete");

    /* ...add classes/styling to these elements... */    
    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv');
        //checkDiv.classList.add('fadeIn');
    taskDiv.classList.add('taskDiv');

    /* Release of js-elements into DOM */
            // list.appendChild(singleTaskWrapper);
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
    taskDiv.innerHTML = task; 
    taskDiv.appendChild(removeSingleTaskButton);

        checkDiv.addEventListener('click', function(){
            checkDiv.setAttribute("id", "checkAnimaionId");
            checkDiv.innerHTML = `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`;
            checkDiv.classList.add('fadeOut');

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

// funkar jättebra, testar dock att prova med ls istället:
//function fetchTaskListFromArray(){
//    for(var i in allTasks){
//        var fetchTaskFromArray = allTasks[i].task;
//        var fetchStatusFromArray = allTasks[i].completed; 
//        var fetchTaskIndexFromArray = allTasks.indexOf(allTasks[i]);
//        createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
//    }
//}

// ****LS TEST****
function fetchTaskListFromLocalStorage(){
    
    for(var i = 0; i < localStorage.length; i++){
        
        var dataFromLocalStorage = JSON.parse(localStorage.getItem('allTasks'));
//        console.log(dataFromLocalStorage[i].task);
//        console.log(dataFromLocalStorage[i].completed);
//        console.log(dataFromLocalStorage[i].indexOf(allTasks[i]));
        
        var fetchTaskFromArray = dataFromLocalStorage[i].task;
        var fetchStatusFromArray = dataFromLocalStorage[i].completed; 
        //var fetchTaskIndexFromArray = dataFromLocalStorage[i].indexOf(allTasks[i]);

       //createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
       createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray);
        
    

        // funkar!!!
//        var hej = JSON.parse(localStorage.getItem('allTasks'));
//        console.log(hej[i].task);


    }

}
// ****LS TEST****

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
        if(allTasks[i].completed === true){
            allTasks.splice(i, 1); 
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