const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
var storageOfCurrentlyMovingTask;
var arrayOfTasks = [];
var arrayOfIncompleteTasks = [];
var doublet;


const completedTaskList = document.getElementById('completedTaskList');



// Adding new task to unmade task list
addTaskButton.addEventListener('click', function(){
    event.preventDefault();

    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
    const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
    

    
    if(doubletCheck(addTaskInput.value)){
       alert("Sorry, there can't be two identical tasks. But don't worry, you'll add a better one. There are plenty of tasks in the sea.");
       }else{
    
        arrayOfTasks.push(addTaskInput.value);
    
    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv');
    taskDiv.classList.add('taskDiv');
    
    unmadeTaskList.appendChild(singleTaskWrapper);
    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);
    
    checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
    taskDiv.innerHTML = addTaskInput.value; 
    taskDiv.appendChild(removeSingleTaskButton); 
    

    
    addTaskInput.value = ''; // clearing input field again after current task has been added
    
           // Checking off a task and moving it to complete list
        checkDiv.addEventListener('click', function(){
            completedTaskList.appendChild(singleTaskWrapper);
            this.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span> ';
        });          
    
           // Successfully removes single task (but gets error in console???)
        removeSingleTaskButton.addEventListener('click', function(){
            //console.log(this.parentNode.parentNode);
            //this.parentNode.parentNode.removeChild(this.parentNode.lastChild)

            while (this.parentNode.parentNode.hasChildNodes()) {   
                this.parentNode.parentNode.removeChild(this.parentNode.parentNode.firstChild);
            }
                
        });
    
    
            // Checking off a task and moving it to complete list


                /* Funkar:
                unmadeTaskList.appendChild(singleTaskWrapper);
                singleTaskWrapper.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ' +           addTaskInput.value; 
                */
          


// Removing all tasks/children from div/parent
removeUnmadeTasksButton.addEventListener('click', function(){
    while(unmadeTaskList.hasChildNodes()){
        unmadeTaskList.removeChild(unmadeTaskList.lastChild)
    }
});
           
           
       } // end of doubletCheck
    
}); // end of addTask(Button)
    



function doubletCheck(taskToCheck){
    for (i = 0; i < arrayOfTasks.length; i++) {
            if(taskToCheck === arrayOfTasks[i]){
                return true;
                  //console.log("Denna uppgift finns redan!");
            }else{
                return false;
            }
    }
}
