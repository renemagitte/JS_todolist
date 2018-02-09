const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');




// Adding new task to unmade task list
addTaskButton.addEventListener('click', function(){
    event.preventDefault();

    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
    
    const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???

    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv');
    taskDiv.classList.add('taskDiv');
    
    unmadeTaskList.appendChild(singleTaskWrapper);
    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);
    
    checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
    taskDiv.innerHTML = addTaskInput.value; 
    taskDiv.appendChild(removeSingleTaskButton); 
    
    
    // Successfully removes single task (but gets error in console???)
        removeSingleTaskButton.addEventListener('click', function(){
            //console.log(this.parentNode.parentNode);
            //this.parentNode.parentNode.removeChild(this.parentNode.lastChild)
            
            while (this.parentNode.parentNode.hasChildNodes()) {   
                this.parentNode.parentNode.removeChild(this.parentNode.parentNode.firstChild);
            }
                
        });
    
    
    /* Funkar:
    unmadeTaskList.appendChild(singleTaskWrapper);
    singleTaskWrapper.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ' +           addTaskInput.value; 
    */
    
});

//removeSingleTaskButton.addEventListener('click', function(){
//    while(this.parentNode.hasChildNodes()){
//        this.parentNode.removeChild(this.parentNode.lastChild)
//    }
//});


// Removing all tasks/children from div/parent
removeUnmadeTasksButton.addEventListener('click', function(){
    while(unmadeTaskList.hasChildNodes()){
        unmadeTaskList.removeChild(unmadeTaskList.lastChild)
    }
});
                               

//addTaskInput.addEventListener('submit', function(){
//    event.preventDefault();
//
//    
//});