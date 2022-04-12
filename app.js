const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskFilter = document.querySelector('#task-filter');
const taskList = document.querySelector('#task-list');
const taskClear = document.querySelector('#task-clear');

// console.log(taskForm);
// console.log(taskInput);
// console.log(taskFilter);
// console.log(taskList);
// console.log(taskClear);

//Load all events
loadEvents();
function loadEvents() {
  document.addEventListener('DOMContentLoaded', getTasks);
  taskForm.addEventListener('submit', addTask);
  taskFilter.addEventListener('keyup', filterTasks);
  taskClear.addEventListener('click', clearTasks);
  taskList.addEventListener('click', removeTask); //using event delegation
}

//display tasks from LS
function getTasks() {
  const tasks = getFromLocalStorage();

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

//add to LS and display tasks
function addTask(e) {
  e.preventDefault();

  const task = taskInput.value;

  if (task === '') {
    alert('Please enter task');
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);

    //save to LS
    saveToLocalStorage(task);
  }
}

//remove task from display and LS
function removeTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocaleStorage(
        e.target.parentElement.parentElement.textContent
      );
    }
  }
}

//Clear all task from display and LS
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (item) {
    const itemText = item.childNodes[0].textContent.toLowerCase();
    if (itemText.indexOf(filterText) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

//Save to Locale Storage
function saveToLocalStorage(input) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(input);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getFromLocalStorage() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  return tasks;
}

function removeTaskFromLocaleStorage(taskInput) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (item, index) {
    if (item === taskInput) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
