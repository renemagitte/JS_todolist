const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const completedTaskList = document.getElementById('completedTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');


const list = document.getElementById('list');
var singleTaskButton;
const test = document.getElementById('test');

var allTasks = [];

function taskObj(task, completed){
    this.task = task;
    this.completed = completed;
}

addTaskButton.addEventListener('click', function(){ 
    saveTaskToArray(); 
    removeListOfTasks(list); // clearing existing list...
    fetchTaskListFromArray(); // ...so array can be looped out again with new task included
})

function removeSingleTask(index) {
    allTasks.splice(index, 1);
    removeListOfTasks(list); 
    fetchTaskListFromArray();
}

function completeTask(index) {
    allTasks[index].completed = true;
    removeListOfTasks(list); 
    fetchTaskListFromArray();
}

function saveTaskToArray(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;
    addTaskInput.value = ''; // clear input field, thus preparing for next input
    var newTaskObj = new taskObj(newTask, false); // adding status: task != completed yet
    allTasks.push(newTaskObj);
}

function fetchTaskListFromArray(){
    for(var i in allTasks){

        var fetchTaskFromArray = allTasks[i].task;
        var fetchStatusFromArray = allTasks[i].completed; 
        var fetchTaskIndexFromArray = allTasks.indexOf(allTasks[i]);
        
        createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);       
    }
}


function createTaskRowElement(task, status, index){
    event.preventDefault();
    
        // Creating DOM elements...   
        const singleTaskWrapper = document.createElement('div');
        const checkDiv = document.createElement('div');
        const taskDiv = document.createElement('div');
        const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
        const completeTaskButton = document.createElement("button");
    
        // ...add classes/styling to these elements...    
        singleTaskWrapper.classList.add('singleTaskWrapper');
        checkDiv.classList.add('checkDiv');
        taskDiv.classList.add('taskDiv');

        // Release of js-elements into DOM
        list.appendChild(singleTaskWrapper);
        singleTaskWrapper.appendChild(checkDiv);
        singleTaskWrapper.appendChild(taskDiv);
            
        // Filling the elements with dynamic content
        checkDiv.innerHTML = trueOrFalse(status);
        checkDiv.appendChild(completeTaskButton);
        taskDiv.innerHTML = task; 
        taskDiv.appendChild(removeSingleTaskButton);
    
        completeTaskButton.addEventListener('click', function(){
            completeTask(index);
        })
    
        removeSingleTaskButton.addEventListener('click', function(){
            removeSingleTask(index);
        })
    
}




function trueOrFalse(status){
            if(status === false){
            return `<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span>`;
            }else if(status === true){
            return `<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>`; 
            }
}





function removeListOfTasks(list){
    while(list.hasChildNodes()){
        list.removeChild(list.lastChild)
    }
}


function buttonTest(){
        removeSingleTaskButton.addEventListener('click', function(){
            //console.log(this.parentNode.parentNode);
            //this.parentNode.parentNode.removeChild(this.parentNode.lastChild)

            while (this.parentNode.parentNode.hasChildNodes()) {   
                this.parentNode.parentNode.removeChild(this.parentNode.parentNode.firstChild);
            }

        }); 
}
