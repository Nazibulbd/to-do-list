const inputField = document.querySelector(".row input");
const addNewBtn = document.querySelector(".row button");
const todoList = document.querySelector(".todo_list");


// add new tasks
function addNewTask(taskName) {
    const li = document.createElement("li");
    li.innerHTML = `<span id='taskName'>${taskName}</span>
                    <span id="action">
                      <i id="edit" class="fa-solid fa-pen"></i>
                      <i id="delete" class="fa-solid fa-trash"></i>
                    </span>`;
  
    todoList.append(li);
    inputField.value = "";
  }

  
// new task add handler
function inputHandler(e) {
    const taskName = inputField.value;
    if (taskName) {
      addNewTask(taskName);
      addToLocalStorage(taskName);
    }
  }
  
  inputField.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      inputHandler(e);
    }
  });
  
  addNewBtn.addEventListener("click", inputHandler);
  
  function createTask(task) {
    return `<span id='taskName'>${task}</span>
    <span id="action">
    <i id="edit" class="fa-solid fa-pen"></i>
    <i id="delete" class="fa-solid fa-trash"></i>
  </span>`;
  }
  
//   delete function start
  todoList.addEventListener("click", (e) => {
    const targetEl = e.target;
    if (targetEl.id === "delete") {
      const li = targetEl.parentElement.parentElement;
      const tasksName = li.querySelector("#taskName").textContent;
      li.remove();
      deleteTask(tasksName);
    }
//delete function end
  
//Edit function start
    if (targetEl.id === "edit") {
      const li = targetEl.parentElement.parentElement;
      const preVal = li.querySelector("#taskName").textContent;
  
      const inp = document.createElement("input");
      const uBtn = document.createElement("button");
      uBtn.textContent =  "update";
    // uBtn.innerHTML = `${taskName} <i id="edit" class="fa-solid fa-pen"></i>`
  
      function updateHandler() {
        const newVal = inp.value;
        editTask(preVal, newVal);
        const innerHTML = createTask(newVal);
        li.innerHTML = innerHTML;
      }
    
      uBtn.addEventListener("click", updateHandler);
  
      inp.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          updateHandler();
        }
      });
  
      inp.value = preVal;
      li.innerHTML = "";
  
      li.appendChild(inp);
      li.appendChild(uBtn);
    }
  });
  
//Edit করে update  করার  function start
  function addToLocalStorage(taskName) {
    const tasks = loadTasksFromLocalStorage();
    tasks.push(taskName);
    addTasksToLocalStorage(tasks);
  }
  
  // load task from local storage
  function loadTasksFromLocalStorage() {
    let tasks = [];
    let rawTasks = localStorage.getItem("tasks");
    if (rawTasks) {
      tasks = JSON.parse(rawTasks);
    }
    return tasks;
  }
  
  // load all tasks
  function loadTasksToUI() {
    const tasks = loadTasksFromLocalStorage();
    tasks.forEach((taskName) => {
      addNewTask(taskName);
    });
  }
  
  loadTasksToUI();
  
  function deleteTask(taskName) {
    const tasks = loadTasksFromLocalStorage();
    const tasksAfterDeleting = tasks.filter((task) => task !== taskName);
    addTasksToLocalStorage(tasksAfterDeleting);
  }
  
  function editTask(taskName, newTaskName) {
    const tasks = loadTasksFromLocalStorage();
    const tasksAfterEditing = tasks.map((task) => {
      if (taskName === task) {
        return newTaskName;
      } else {
        return task;
      }
    });
    addTasksToLocalStorage(tasksAfterEditing);
  }
  
  function addTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
















































































// addNewBtn.addEventListener("click", ()=>{
//     const taskName = inputField.value;
//     if (taskName){
//         const li = document.createElement("li");
//         li.innerHTML = `${taskName} <i id="delete" class="fa-solid fa-trash"></i>`;
//         // li.innerHTML = `${taskName} <button id="delete">X</button>`;
//         todoList.append(li);
//         inputField.value = ""
//     }
// });

// todoList.addEventListener("click", (e)=>{
//     const targetEl = e.target;
//     if(targetEl.id === "delete"){
//         targetEl.parentElement.remove()
//     }
// });
