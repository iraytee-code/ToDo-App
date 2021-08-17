// getting all required elements 


const addTask = document.querySelector(".search-task");

const searchTask = document.querySelector(".search");

const createTask = document.querySelector(".todo-button");

const clearTask = document.querySelector(".clear-all");

const listItems = document.querySelector(".list");




//Activating and Deactivating the add task and search task buttons



addTask.onkeyup = ()=>{
    let userData = addTask.value; //to get user data value entered

    if(userData.trim() != "" ){ //if user value isnt empty
        createTask.classList.add("active"); // make the new task button active

        searchTask.classList.add("active"); //make the search button active
    } else {
        createTask.classList.remove("active"); // make the new task button inactive

        searchTask.classList.remove("active"); //make the search button inactive
    }

}


showTasks() // calling the showtask function
// adding a new task to local storage when value is enteredand new task is clicked

createTask.onclick = ()=>{

    let userData = addTask.value; //to get user data value entered

    let geLocalStorageData = localStorage.getItem("New Tasks"); //getting items or strings from memory

    if(geLocalStorageData === "" ){//if local storage data value is null or empty
        listArray = []; // creating an empty array or list
    } else {
        listArray = JSON.parse(geLocalStorageData); //parse the tings from the array nto a json object
    }
        
    listArray.push(userData);
    localStorage.setItem("New Tasks", JSON.stringify(listArray)); //transforminh json object into string

    showTasks() // calling the showtask function
    createTask.classList.remove("active")
}

function showTasks(){

    let geLocalStorageData = localStorage.getItem("New Tasks"); //getting items or strings from memory

    if(geLocalStorageData == null ){//if local storage data value is null or empty
        listArray = []; // creating an empty array or list
    } else {
        listArray = JSON.parse(geLocalStorageData); //parse the tings from the array nto a json object
    }

    if(listArray.length > 0){
        clearTask.classList.add("active");
    } else {
        clearTask.classList.remove("active")
    }
    
    const pendingNumb = document.querySelector(".pending");

    pendingNumb.textContent = listArray.length; //passs the lenght value 


    let newListTag = '';

    listArray.forEach((element, index) => {
        
        newListTag += `
        <li> ${element}
            <span onclick="deleteTask(${index})";>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
          </li>
        `

    });

    listItems.innerHTML = newListTag;// adding a new li into ul

    addTask.value = ""; //returns the input value to null 
}


//Delete task 

function deleteTask(index){
    let geLocalStorageData = localStorage.getItem("New Tasks"); //getting items or strings from memory

    listArray = JSON.parse(geLocalStorageData); //parse the tings from the array nto a json object

    listArray.splice(index, 1); //deletes or removes the targeted index

    // upate the list from memory after removal

    localStorage.setItem("New Tasks", JSON.stringify(listArray)); //transforminh json object into string

    showTasks(); //calling the showtasks function
}


// deleting all tasks 

clearTask.onclick=()=>{
    let geLocalStorageData = localStorage.getItem("New Tasks"); //getting items or strings from memory
    listArray = []; // creating an empty array or list
     // upate the list from memory after removal

     localStorage.setItem("New Tasks", JSON.stringify(listArray)); //transforminh json object into string

     showTasks(); //calling the showtasks function
}

