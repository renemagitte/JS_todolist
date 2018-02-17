const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
//const unmadeTaskList = document.getElementById('unmadeTaskList');
//const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');


const completedTaskList = document.getElementById('completedTaskList');
const list = document.getElementById('list');
var singleTaskButton;
const test = document.getElementById('test');

var allTasks = [];

function taskObj(task, completed){
    this.task = task;
    this.completed = completed;
}

addTaskButton.addEventListener('click', function(){ 
    if(!(doubletCheck())){  
        saveTaskToArray();
        removeListOfTasks(list); // clearing existing list...
        fetchTaskListFromArray(); // ...so array can be looped out again with new task included
    }
})

removeCompletedTasksButton.addEventListener('click', function(){ 
    removeAllCompletedTasks();
    removeListOfTasks(list); 
    fetchTaskListFromArray();
})

function removeSingleTask(index) {
    allTasks.splice(index, 1);
    removeListOfTasks(list); 
    fetchTaskListFromArray();
}


function completeTask(index) {
    allTasks[index].completed = true;
    removeListOfTasks(list);
    removeListOfTasks(completedTaskList); 
    fetchTaskListFromArray();
}

function saveTaskToArray(){
    event.preventDefault(); 
    var newTask = addTaskInput.value;
    addTaskInput.value = ''; // clear input field, thus preparing for next input
    var newTaskObj = new taskObj(newTask, false); // adding status: task != completed yet
    allTasks.push(newTaskObj);
    
    localStorage.setItem('newTaskObj', JSON.stringify(newTaskObj));
    

    //localStorage.setItem('newTaskObj', JSON.stringify(newTaskObj));
    
//var retrievedObject = localStorage.getItem('newTaskObj');

//console.log('retrievedObject: ', JSON.parse(retrievedObject));
    
}

function fetchTaskListFromArray(){
    for(var i in allTasks){

        var fetchTaskFromArray = allTasks[i].task;
        var fetchStatusFromArray = allTasks[i].completed; 
        var fetchTaskIndexFromArray = allTasks.indexOf(allTasks[i]);
        
        createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray, fetchTaskIndexFromArray);
}
    
    var retrievedObject = localStorage.getItem('newTaskObj');
    
//    for(var i in retrievedObject){
//        console.log(JSON.parse(localStorage.getItem('task')));
//    }
    
//    var retrievedObject = localStorage.getItem('newTaskObj');
//    
//    //console.log(retrievedObject[i].task);
//    
//    for(var i in retrievedObject){
//        //var fetchTaskFromArray = 
//        //console.log('retrievedObject: ', JSON.parse(retrievedObject.task));
//        console.log(JSON.parse(retrievedObject[i].task));
//    }
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
    
} //doubletCheck


function createTaskRowElement(task, status, index){
    event.preventDefault();
    
        // Creating DOM elements...   
        const singleTaskWrapper = document.createElement('div');
        const checkDiv = document.createElement('div');
    
            //checkDiv.setAttribute("id", "checkAnimaionId");
    
            //checkDiv.classList.add('checkAnimaionId');
    
        const taskDiv = document.createElement('div');
        const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
        const completeTaskButton = document.createElement("button");
    
        // ...add classes/styling to these elements...    
        singleTaskWrapper.classList.add('singleTaskWrapper');
        checkDiv.classList.add('checkDiv');
        taskDiv.classList.add('taskDiv');

        // Release of js-elements into DOM
        // list.appendChild(singleTaskWrapper);
    
        if(status === false){
            list.appendChild(singleTaskWrapper);
        }else if(status === true){
            completedTaskList.appendChild(singleTaskWrapper);
        }

        singleTaskWrapper.appendChild(checkDiv);
        singleTaskWrapper.appendChild(taskDiv);
            
        // Filling the elements with dynamic content
        checkDiv.innerHTML = trueOrFalse(status);
        //checkDiv.appendChild(completeTaskButton);
        taskDiv.innerHTML = task; 
        taskDiv.appendChild(removeSingleTaskButton);
    
            //completeTaskButton.addEventListener('click', function(){
            checkDiv.addEventListener('click', function(){
                
                checkDiv.setAttribute("id", "checkAnimaionId");

// TEST ZONE PROJECT: "A TASK COMPLETE, MAKES THE HEART BEAT"
//            let heart = checkDiv.innerHTML;
//            
//                heart.animate([
////                  { transform: 'translateX(0)'},
////                  { transform: 'translateX(100px)'},
////                  { transform: 'translateX(0)'}
//                    checkDiv.classList.add('checkDiv2'),
//                    checkDiv.classList.add('checkDiv') 
//                  ],{
//                    duration: 2000,
//                    }
//                             
//                )
//            
//        //checkDiv.classList.add('checkDiv2');  
//            
//
////          setTimeout(function (){
////            document.body.removeChild(document.body.lastElementChild);
////          }, 400); 
//            
          setTimeout(function (){
        event.preventDefault();
            console.log(completeTask(index));
            //completeTask(index);
            //checkDiv.setAttribute("id", "checkAnimaionId");
              
          }, 3000);  
                
           // completeTask(index);
//            
            
            //completeTask(index);
                

                
            
                
            }) //completeTaskEventListener
    
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

function removeAllCompletedTasks(){
    for (i = 0; i < allTasks.length; i++) {
        if(allTasks[i].completed === true){
            allTasks.splice(i, 1); 
        } 
    }
    
    removeListOfTasks(list);
    removeListOfTasks(completedTaskList); 
    fetchTaskListFromArray();
}