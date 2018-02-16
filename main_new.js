const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const completedTaskList = document.getElementById('completedTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');
var storageOfCurrentlyMovingTask;
var arrayOfTasks = [];
var arrayOfIncompleteTasks = []; //byta ut mor en varibal som endast innehåller ett nummer? +1 för varje task som läggs till??
var doublet;



var allTasks = [];

function TaskObj(task, complete){
        this.task = task;
        this.complete = Boolean;
}

addTaskButton.addEventListener('click', function(){
//    saveTodoToArray();
//    var currentTodo = addTaskInput.value;
    
    var newTask = addTaskInput.value;
    
    saveTaskToArray(newTask);

    createTaskRowElement(newTask);
})


//function saveTaskToArray(){
//    event.preventDefault();
//    
//    var newTask = new TaskObj(addTaskInput.value, false); 
//
//    allTasks.push(newTask);
//    
//    //console.log(allTasks[0].task);
//    
//    //loc_array[loc_array.length-1]
//    //console.log(allTasks[allTasks.length-1].task);
//}

function saveTaskToArray(taskToSave){
    event.preventDefault();
    
    var newTaskObj = new TaskObj(taskToSave, false); 

    allTasks.push(newTaskObj);
    
    

//    allTasks.push(new TaskObj(taskToSave, false));
    
    
    
    //console.log(allTasks[0].task);
    //loc_array[loc_array.length-1]
    //console.log(allTasks[allTasks.length-1].task);
}





//allTasks[allTasks.length-1.task]

function createTaskRowElement(){
    
        // Creating DOM elements...   
        const singleTaskWrapper = document.createElement('div');
        const checkDiv = document.createElement('div');
        const taskDiv = document.createElement('div');
        const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
           
        // ...add classes/styling to these elements...    
        singleTaskWrapper.classList.add('singleTaskWrapper');
        checkDiv.classList.add('checkDiv');
        taskDiv.classList.add('taskDiv');

        // Release of js-elements into DOM
        unmadeTaskList.appendChild(singleTaskWrapper);
        singleTaskWrapper.appendChild(checkDiv);
        singleTaskWrapper.appendChild(taskDiv);
            
        // Filling the elements with content
        checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
        taskDiv.innerHTML = allTasks[allTasks.length-1].task; //lägger till sista task från arrayen
        taskDiv.appendChild(removeSingleTaskButton); 
    
    
}

//console.log(data[0].Value);


//console.log(allTasks[task]);
//console.log(allTasks[task]);
//console.log(allTasks.task);
//console.log(allTasks.task);
//console.log(allTasks.task);
//







//______________________________________________________________________
/*


const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const completedTaskList = document.getElementById('completedTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');
var storageOfCurrentlyMovingTask;
var arrayOfTasks = [];
var arrayOfIncompleteTasks = []; //byta ut mor en varibal som endast innehåller ett nummer? +1 för varje task som läggs till??
var doublet;




EVENT LISTENERS


// ADD NEW TASK EVENT
addTaskButton.addEventListener('click', function(){
    addTodo();
})

//// COMPLETE TASK
//checkDiv.addEventListener('click', function(){
//    console.log(this);
//    //completeTask(checkDiv.nextElementSibling.innerText);
//}); 



// REMOVE LIST OF UNMADE TASKS
removeUnmadeTasksButton.addEventListener('click', function(){
    removeListOfTasks(unmadeTaskList);
})

// REMOVE LIST OF COMPLETED TASKS
removeCompletedTasksButton.addEventListener('click', function(){
    removeListOfTasks(completedTaskList);
})


FUNCTIONS    


// ADDING NEW TASK TO UNMADE TASK LIST
function addTodo(){
    event.preventDefault();
   
    if(doubletCheck(addTaskInput.value)){
       alert("Sorry, there can't be two identical tasks. But don't worry, you'll add a better one. There are plenty of tasks in the sea.");
       }else{
    
        arrayOfTasks.push(addTaskInput.value);
        arrayOfIncompleteTasks.push(addTaskInput.value);
          
        // Creating DOM elements...   
        const singleTaskWrapper = document.createElement('div');
        const checkDiv = document.createElement('div');
        const taskDiv = document.createElement('div');
        const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
           
        // ...add classes/styling to these elements...    
        singleTaskWrapper.classList.add('singleTaskWrapper');
        checkDiv.classList.add('checkDiv');
        taskDiv.classList.add('taskDiv');

        // Release of js-elements into DOM
        unmadeTaskList.appendChild(singleTaskWrapper);
        singleTaskWrapper.appendChild(checkDiv);
        singleTaskWrapper.appendChild(taskDiv);
            
        // Filling the elements with content
        checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
        taskDiv.innerHTML = addTaskInput.value; 
        taskDiv.appendChild(removeSingleTaskButton); 
    
        addTaskInput.value = ''; // clearing input field again after current task has been added

           
        // EVENTLISTENER: COMPLETE TASK
        // try to move this outside
        // kanske genom att ta ur checkdiv-siblings innertext, skicka med i funktion..
        // eller fatta hur man returnerar (som house och person-exemplet på lektionen!!! fatta det!!)
           
        checkDiv.addEventListener('click', function(){
            completedTaskList.appendChild(singleTaskWrapper);
            checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span> ';
        });   
           
           
//    
//           // Successfully removes single task (but gets error in console???)
//        removeSingleTaskButton.addEventListener('click', function(){
//            //console.log(this.parentNode.parentNode);
//            //this.parentNode.parentNode.removeChild(this.parentNode.lastChild)
//
//            while (this.parentNode.parentNode.hasChildNodes()) {   
//                this.parentNode.parentNode.removeChild(this.parentNode.parentNode.firstChild);
//            }
//                
//        });
//    
//    



           
           
       } // end of doubletCheck
} // end of addTodo

//COMPLETE TASK
//function completeTask(){
//   completedTaskList.appendChild(singleTaskWrapper);
//    this.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span>  
//}

//// COMPLETE TASK
//function completeTask(checkmark, wrapperToComplete){
//            completedTaskList.appendChild(wrapperToComplete);
//            checkmark.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span> ';
//} 

// REMOVE ALL TASKS OF A LIST
function removeListOfTasks(list){
    while(list.hasChildNodes()){
        list.removeChild(list.lastChild)
    }
} 

// CHECK FOR DOUBLET IN ARRAY OF ALL (BOTH COMPLETE/INCOMPLETE) TASKS.
function doubletCheck(taskToCheck){
    for (i = 0; i < arrayOfTasks.length; i++) {
            if(taskToCheck === arrayOfTasks[i]){
                return true;
            }else{
                return false;
            }
    }

    
*/