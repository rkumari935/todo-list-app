var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");
var completeAllButton = document.getElementById("complete-all");
var priorityInput = document.getElementById("priority-input");

// Event listeners
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);
completeAllButton.addEventListener("click", completeAll);

// Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Click listeners for filters and actions
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e);
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Update counters and lists
function update() {
    comdoList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}

// Add task
function add() {
    var value = todoInput.value;
    var priority = priorityInput.value;
    if (value === '') {
        alert("😮 Task cannot be empty")
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
        priority: priority,
    });

    todoInput.value = "";
    update();
    addinmain(todoList);
}

// Render tasks
function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
            <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
            <p class="priority">Priority: ${element.priority}</p>
            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>
                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;

        // Priority color
        if (element.priority == "High") {
            document.getElementById(element.id).style.backgroundColor = "#ff6961";
        } else if (element.priority == "Medium") {
            document.getElementById(element.id).style.backgroundColor = "#fdfd96";
        } else {
            document.getElementById(element.id).style.backgroundColor = "#77dd77";
        }
    });
}

// Delete individual task
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => ele.id != deleted);
    update();
    addinmain(todoList);
}

// Complete individual task
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            obj.complete = !obj.complete;
            var taskElement = e.target.parentElement.parentElement.querySelector("#task");
            taskElement.classList.toggle("line");
        }
    });
    update();
    addinmain(todoList);
}

// Delete all
function deleteAll() {
    todoList = [];
    update();
    addinmain(todoList);
}

// Delete only completed
function deleteS() {
    todoList = todoList.filter((ele) => !ele.complete);
    update();
    addinmain(todoList);
}

// Mark all completed
function completeAll() {
    todoList.forEach((todo) => todo.complete = true);
    update();
    addinmain(todoList);
}

// Filters
function viewCompleted() { addinmain(comdoList); }
function viewRemaining() { addinmain(remList); }
function viewAll() { addinmain(todoList); }