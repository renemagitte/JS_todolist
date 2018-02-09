const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');


removeUnmadeTasksButton


addTaskButton.addEventListener('click', function(){
    event.preventDefault();
    console.log(addTaskButton);
    console.log(addTaskInput.value);
    // unmadeTaskList.innerText = addTaskInput.value;
    
    const div = document.createElement('div');
    //document.body.appendChild(div);
    unmadeTaskList.appendChild(div);
    div.innerText = addTaskInput.value; 
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