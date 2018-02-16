const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const completedTaskList = document.getElementById('completedTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
const removeCompletedTasksButton = document.getElementById('removeCompletedTasksButton');



var allTasks = [];

function taskObj(task, completed){
        this.task = task;
        this.completed = completed;
}

addTaskButton.addEventListener('click', function(){
    
//    var newTask = addTaskInput.value;
//    
//    saveTaskToArray(newTask);
    
    saveTaskToArray();
    
    //createTaskRowElement(newTask);
    
    forLoopTest();
    
})

function saveTaskToArray(){
    event.preventDefault();
    
    var newTask = addTaskInput.value;
    
    var newTaskObj = new taskObj(newTask, true);
    //var newTaskObj = new taskObj(taskToSave, true); 

    allTasks.push(newTaskObj);

}



function forLoopTest(){
    for(var i in allTasks){
        
        console.log(allTasks[i].task);  
        console.log(allTasks[i].completed);  
        
        var fetchTaskFromArray = allTasks[i].task;
        var fetchStatusFromArray = allTasks[i].completed; 
        
        createTaskRowElement(fetchTaskFromArray, fetchStatusFromArray);
        
    }


}

//testar med parametrar:
function createTaskRowElement(task, status){
    
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
        if(status === false){
        checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> '
        }else if(status === true){
        checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span> '   
        }
        taskDiv.innerHTML = task;
        taskDiv.appendChild(removeSingleTaskButton); 
    
    
}


// funkar jättebra!!:
//function createTaskRowElement(){
//    
//        // Creating DOM elements...   
//        const singleTaskWrapper = document.createElement('div');
//        const checkDiv = document.createElement('div');
//        const taskDiv = document.createElement('div');
//        const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
//           
//        // ...add classes/styling to these elements...    
//        singleTaskWrapper.classList.add('singleTaskWrapper');
//        checkDiv.classList.add('checkDiv');
//        taskDiv.classList.add('taskDiv');
//
//        // Release of js-elements into DOM
//        unmadeTaskList.appendChild(singleTaskWrapper);
//        singleTaskWrapper.appendChild(checkDiv);
//        singleTaskWrapper.appendChild(taskDiv);
//            
//        // Filling the elements with content
//        checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
//        taskDiv.innerHTML = allTasks[allTasks.length-1].task; //lägger till sista task från arrayen
//        taskDiv.appendChild(removeSingleTaskButton); 
//    
//    
//}

//let htmlBlock = "";
//// the loop create ALL html
//for(const taskRow of tasksElement){
//   htmlBlock += `
//    <section>
//    <h2>${article.title}</h2>
//    <p>${article.content}</p>
//    </section>
//`; 
//
//}
// append to DOM efter you are done
//output.innerHTML = htmlBlock

//output.insertAdjacentHTML('afterbegin', htmlBlock);
