"use strict";

import { updateTask, deleteTask, countKeys, getAllTask, clearTask } from "../model/taskmodel.js";
import { addValidate } from "../views/validation.js";
/* Generate this code
<div class="card">
	<div class="date">
		<div>
			<h1>08</h1>
			<h3>25</h3>
		</div>
		<h6>4:28 pm</h6>
	</div>
	<div class="content">
		<h2>Title of Task</h2>
		<div>
			<p>Category</p>
		</div>
	</div>
	<div class="buttons">
		<button type="button" class="edit">
			<i class="ri-pencil-line"></i>
		</button>
		<button type="button" class="delete">
			<i class="ri-delete-bin-line"></i>
		</button>
	</div>
</div>
*/
function displayTask(taskId, taskName, taskCategory, dueDate, dueTime, isDone) {
	const card = document.createElement('div');
	card.setAttribute(`class`, `card`);
	card.addEventListener("dblclick", completeTask);
	
	// Date section
	const date = document.createElement('div');
	date.setAttribute(`class`, `date`);
	const date_div = document.createElement('div');
	const date_div_h1 = document.createElement('h1');
	date_div_h1.textContent = dayjs(dueDate).format('DD');
	const date_div_h3 = document.createElement('h3');
	date_div_h3.textContent = dayjs(dueDate).format('MMM');
	const date_div_h6_1 = document.createElement('h6');
	date_div_h6_1.textContent = dayjs(dueDate).format('YYYY');
	const date_div_h6_2 = document.createElement('h6');
	date_div_h6_2.textContent = timeConvert(dueTime);
	
	// Content section
	const content = document.createElement('div');
	content.setAttribute(`class`, `content`);
	const content_h2 = document.createElement('h2');
	content_h2.textContent = `${taskName}`;
	const content_div = document.createElement('div');
	content_div.addEventListener("click", filterByCategory);
	content_div.setAttribute(`class`, `category pointer`);
	const content_div_p = document.createElement('p');
	content_div_p.textContent = `${taskCategory}`;
	
	// Buttons section
	const buttonsDiv = document.createElement('div');
	buttonsDiv.setAttribute(`class`, `buttons`);
	
	const editBtn = document.createElement('button');
	editBtn.setAttribute(`class`, `edit`);
	editBtn.setAttribute("data-id", taskId);
	editBtn.setAttribute("data-name", taskName);
	editBtn.setAttribute("data-category", taskCategory);
	editBtn.setAttribute("data-date", dueDate);
	editBtn.setAttribute("data-time", dueTime);
	editBtn.addEventListener("click", openEdit);
  
	const iconEdit = document.createElement('i');
	iconEdit.setAttribute(`class`, `ri-pencil-line`);
	
	const deleteBtn = document.createElement('button');
	deleteBtn.setAttribute(`class`, `delete`);
	deleteBtn.setAttribute("data-id", taskId);
	deleteBtn.addEventListener("click", openDelete);
	
	const iconDelete = document.createElement('i');
	iconDelete.setAttribute(`class`, `ri-delete-bin-line`);
	
	date_div.appendChild(date_div_h1);
	date_div.appendChild(date_div_h3);
	date.appendChild(date_div);
	date.appendChild(date_div_h6_1);
	date.appendChild(date_div_h6_2);
	
	content_div.appendChild(content_div_p);
	content.appendChild(content_h2);
	content.appendChild(content_div);
	
	editBtn.appendChild(iconEdit);
	deleteBtn.appendChild(iconDelete);
	buttonsDiv.appendChild(editBtn);
	buttonsDiv.appendChild(deleteBtn);
	
	card.appendChild(date);
	card.appendChild(content);
	card.appendChild(buttonsDiv);
	
	loadCompletedTask(card, isDone);
	
	document.querySelector(`.card_wrapper`).appendChild(card);
}

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

/* Get Quantity of all Todos */
var allKeys = await countKeys();
var task_indicator = document.querySelector(".task_indicator");

function displayTaskQuantity() {
  if (allKeys == 0) {
  	task_indicator.textContent = ``;
    document.querySelector('#completedsvg').classList.remove('none');
    document.querySelector('#completedsvgtext').classList.remove('none');
  }
  else {
  	document.querySelector('#completedsvg').classList.add('none');
  	document.querySelector('#completedsvgtext').classList.add('none');
    task_indicator.textContent = `You have ${allKeys} task(s)`;
  }
}
// Get All of Task in IndexedDB and Display 
const taskList = await getAllTask();

function displayTaskList(taskList) {
  taskList.forEach(task => {
    displayTask(task.id, task.name, task.category, task.dueDate, task.dueTime, task.isDone);
  });
}

displayTaskQuantity();
displayTaskList(taskList);

// Add Task 
async function taskAdd() {
	const taskName = document.querySelector('.modalform #task').value;
	const taskCategory = document.querySelector('.modalform #category').value;
  	const dueDate = document.querySelector('.modalform #date').value;
	const dueTime = document.querySelector('.modalform #time').value;
	const uuid = uuidv4();
	// Generate UUID
	addValidate(uuid, taskName, taskCategory, dueDate, dueTime);
} 
// Edit task
function taskEdit() {
	const taskId = document.querySelector('#editid').value;
	const taskName = document.querySelector('#edittask').value;
	const taskCategory = document.querySelector('#editcategory').value;
	const dueDate = document.querySelector('#editdate').value;
	const dueTime = document.querySelector('#edittime').value;
	updateTask(taskId, taskName, taskCategory, dueDate, dueTime);
	window.location.reload();
}
// Delete task
function taskDelete() {
	const taskId = document.querySelector('#deleteid').value;
	deleteTask(taskId);
	window.location.reload();
}
function openEdit() {
	toggleModal('modaledittask');
	document.querySelector('#editid').value = this.getAttribute('data-id');
	document.querySelector('#edittask').value = this.getAttribute('data-name');
	document.querySelector('#editcategory').value = this.getAttribute('data-category');
	document.querySelector('#editdate').value = this.getAttribute('data-date');
	document.querySelector('#edittime').value = this.getAttribute('data-time');
}
function openDelete() {
	toggleModal('modaldelete');
	document.querySelector('#deleteid').value = this.getAttribute('data-id');
}
function completeTask() {
  // Select the 2nd child of 3rd div to get data attributes
  const taskId = this.children[2].children[0].getAttribute('data-id');
	const taskName = this.children[2].children[0].getAttribute('data-name');
	const taskCategory = this.children[2].children[0].getAttribute('data-category');
	const dueDate = this.children[2].children[0].getAttribute('data-date');
	const dueTime = this.children[2].children[0].getAttribute('data-time');
	
  if(this.style.opacity != .2){
    // Add pointer-none class
    this.children[1].childNodes.forEach((child) => {
      child.classList.add('pointer-none');
    });
    this.children[2].childNodes.forEach((child) => {
      child.classList.add('pointer-none');
    })
    this.style.opacity = .2;
    this.classList.add('complete');
    updateTask(taskId, taskName, taskCategory, dueDate, dueTime, 1);
  }
  else {
    this.children[1].childNodes.forEach((child) => {
      child.classList.remove('pointer-none');
    });
    this.children[2].childNodes.forEach((child) => {
      child.classList.remove('pointer-none');
    })
    this.style.opacity = 1;
    this.classList.remove('complete');
    updateTask(taskId, taskName, taskCategory, dueDate, dueTime, 0);
  }
}
function loadCompletedTask(card, isDone) {
  if(isDone == 1) {
	  card.children[1].childNodes.forEach((child) => {
      child.classList.add('pointer-none');
    });
    card.children[2].childNodes.forEach((child) => {
      child.classList.add('pointer-none');
    })
	  card.style.opacity = .2;
	  card.classList.add('complete');
	}
}

var isFilteredByCategory = false;

function filterTask() {
  // Remove all children of card warpper first
  document.querySelector(`.card_wrapper`).innerHTML = '';
  
  let filterTaskList = taskList;
  let filterValue = document.querySelector('.searchTerm').value.toLowerCase();
  
  if(filterValue != '') {
    let filteredTask = [];
  
    filterTaskList.filter((task) => {
      if(filterValue.match(new RegExp(task.name.toLowerCase(), 'gis')) || 
      filterValue.match(new RegExp(task.category.toLowerCase(), 'gis')) ||
      filterValue.match(new RegExp(dayjs(task.dueDate).format('DD').toLowerCase(), 'gis')) ||
      filterValue.match(new RegExp(dayjs(task.dueDate).format('MMM').toLowerCase(), 'gis')) ||
      filterValue.match(new RegExp(timeConvert(task.dueTime).toLowerCase()), 'gis')) {
        filteredTask.push(task);
      }
    });
    // Check the length of filtered task. If 0 results, display the svg
    if(filteredTask.length != 0) {
      task_indicator.textContent = `${filteredTask.length} result(s) found`;
      displayTaskList(filteredTask);
      document.querySelector('#errorsvg').classList.add('none');
    }
    if(filteredTask.length == 0 && taskList.length > 0) {
      task_indicator.textContent = null;
      document.querySelector('#errorsvg').classList.remove('none');
    }
  }
  else {
    displayTaskList(taskList);
    displayTaskQuantity();
    document.querySelector('#errorsvg').classList.add('none');
  }
}

function filterByCategory() {
  if(!isFilteredByCategory) {
    // Remove all children of card warpper first
    document.querySelector(`.card_wrapper`).innerHTML = '';
    
    let filterTaskList = taskList;
    let filterValue = this.textContent.toLowerCase();
    
    if(filterValue != '') {
      let filteredTask = [];
      filterTaskList.filter((task) => {
        if(filterValue == task.category.toLowerCase()) {
          filteredTask.push(task);
        }
      });
      task_indicator.textContent = `${filteredTask.length} result(s) found`;
      displayTaskList(filteredTask);
    }
    isFilteredByCategory = true;
    document.querySelector(`.category`).style.backgroundColor = 'var(--alt-color)';
    document.querySelector(`.category`).style.color = 'var(--primary-color)';
  }
  else {
    // Remove all children of card warpper first
    document.querySelector(`.card_wrapper`).innerHTML = '';
    
    displayTaskList(taskList);
    displayTaskQuantity();
    isFilteredByCategory = false;
    document.querySelector(`.category`).style.backgroundColor = null;
    document.querySelector(`.category`).style.color = null;
  }
}

document.querySelector('#addTask').addEventListener("click", taskAdd);
document.querySelector('#editTask').addEventListener("click", taskEdit);
document.querySelector('#deleteTask').addEventListener("click", taskDelete);

// For filtering
document.querySelector('.searchTerm').addEventListener("input", filterTask);