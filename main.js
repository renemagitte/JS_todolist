const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');


addTaskButton.addEventListener('click', function(){
    event.preventDefault();
    //console.log(addTaskButton);
    //console.log(addTaskInput.value);
    // unmadeTaskList.innerText = addTaskInput.value;
    
    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
    
    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv');
    taskDiv.classList.add('taskDiv');
    
    unmadeTaskList.appendChild(singleTaskWrapper);
    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);
    
    checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
    taskDiv.innerText = addTaskInput.value; 
    
    
    /* Funkar:
    unmadeTaskList.appendChild(singleTaskWrapper);
    singleTaskWrapper.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ' +           addTaskInput.value; 
    */
    
});


removeUnmadeTasksButton.addEventListener('click', function(){
    //unmadeTaskList.removeChild;
    //unmadeTaskList.removeChild(unmadeTaskList.firstChild)
    
    while(unmadeTaskList.hasChildNodes()){
        unmadeTaskList.removeChild(unmadeTaskList.lastChild)
    }
    
});
                               

//addTaskInput.addEventListener('submit', function(){
//    event.preventDefault();
//
//    
//});