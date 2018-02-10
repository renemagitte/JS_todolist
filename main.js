const addTaskInput = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const unmadeTaskList = document.getElementById('unmadeTaskList');
const removeUnmadeTasksButton = document.getElementById('removeUnmadeTasksButton');
var storageOfCurrentlyMovingTask;
var arrayOfTasks = [];


const completedTaskList = document.getElementById('completedTaskList');



// Adding new task to unmade task list
addTaskButton.addEventListener('click', function(){
    event.preventDefault();

    const singleTaskWrapper = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
 
    const removeSingleTaskButton = document.createElement("button"); //måste sätta value på denna knapp???
    
    //lägga in i array med listpunkter

    
    
    doubletCheck(addTaskInput.value);
    
    singleTaskWrapper.classList.add('singleTaskWrapper');
    checkDiv.classList.add('checkDiv');
    taskDiv.classList.add('taskDiv');
    
    unmadeTaskList.appendChild(singleTaskWrapper);
    singleTaskWrapper.appendChild(checkDiv);
    singleTaskWrapper.appendChild(taskDiv);
    
    checkDiv.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart-empty" aria-hidden="true"></span> ';
    taskDiv.innerHTML = addTaskInput.value; 
    taskDiv.appendChild(removeSingleTaskButton); 
    
    arrayOfTasks.push(addTaskInput.value);
    
    addTaskInput.value = ''; // clearing input field again after current task has been added
    
// Checking off a task and moving it to complete list
        checkDiv.addEventListener('click', function(){
            completedTaskList.appendChild(singleTaskWrapper);
            this.innerHTML = '<span class="glyphicon glyphicon-glyphicon glyphicon-heart" aria-hidden="true"></span> ';
        });          

            
//            while (this.parentNode.parentNode.hasChildNodes()) {   
//                this.parentNode.parentNode.removeChild(this.parentNode.parentNode.firstChild);
//            }

//            }
    
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
    
}) // end of addTask(Button)


                                function doubletCheck(taskToCheck){
                                    for (i = 0; i < arrayOfTasks.length; i++) {
                                            if(taskToCheck === arrayOfTasks[i]){
                                                  console.log("Denna uppgift finns redan!");
                                            }else{
                                                    console.log("ok task");
                                            }
                                    }
                    
                                }


//                                function doubletCheck(taskToCheck){
//                                    //counting rows in task list for preparing for loop.
//                                    
//NodeList.prototype.forEach = Array.prototype.forEach
//var children = unmadeTaskList.childNodes;
//children.forEach(function(item){
//    console.log(item);
//});
////                                    var allTasks = document.getElementById("unmadeTaskList").childElementCount + 1;
////                                       
////                                    //console.log(allTasks);
////                                    console.log(taskDiv.innerText);
////                                    
////                                    for (i = 0; i < allTasks.length; i++) {
////                                        
////                                        console.log(taskDiv.innerText);
////                                        
//////                                            if(taskToCheck === taskDiv.innerText){
//////                                                console.log("Denna uppgift finns redan!");
//////                                            }else{
//////                                                console.log("ok task");
//////                                            }
////                                    }
//                                    
//                              
//                                }
                               

//addTaskInput.addEventListener('submit', function(){
//    event.preventDefault();
//
//    
//});