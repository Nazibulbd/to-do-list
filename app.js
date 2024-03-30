const inputField = document.querySelector(".row input");
const addNewBtn = document.querySelector(".row button");
const todoList = document.querySelector(".todo_list");


addNewBtn.addEventListener("click", ()=>{
    const taskName = inputField.value;
    if (taskName){
        const li = document.createElement("li");
        li.innerHTML = `${taskName} <i id="delete" class="fa-solid fa-trash"></i>`;
        todoList.append(li);
        inputField.value = ""
    }
});

todoList.addEventListener("click", (e)=>{
    const targetEl = e.target;
    if(targetEl.id === "delete"){
        targetEl.parentElement.remove()
    }
});

// listContainer.addEventListener("click", (e)=>{
//     if(e.target.tagName = "LI"){
//         e.target.classList.toggle("checked");
//     }
//     else if(e.target.tagName === "I"){
//         e.target.parentElement.remove
//     }
// }, false);