import { addTask } from "../model/taskmodel.js";

export function addValidate(taskId, taskName, taskCategory, dueDate, dueTime) {
  const nameInput = document.querySelector('#task');
  const categoryInput = document.querySelector('#category');
  const dateInput = document.querySelector('#date');
  const timeInput = document.querySelector('#time');
  
  const nameValidation = document.querySelector('.name_validation');
  const categoryValidation = document.querySelector('.category_validation');
  const dateValidation = document.querySelector('.date_validation');
  const timeValidation = document.querySelector('.time_validation');
  
  var validation = true;
  
  if(nameInput.value == '') {
    nameValidation.textContent = 'Please input task name';
    validation = false;
  }
  else {
    nameValidation.textContent = '';
  }
  if(categoryInput.value == 'Choose Category') {
    categoryValidation.textContent = 'Please select a category';
    validation = false;
  }
  else {
    categoryValidation.textContent = '';
  }
  if(dateInput.value == '') {
    dateValidation.textContent = 'Please select due date';
    validation = false;
  }
  else {
    dateValidation.textContent = '';
  }
  if(timeInput.value == '') {
    timeValidation.textContent = 'Please select due time';
    validation = false;
  }
  else {
    timeValidation.textContent = '';
  }
  
  if(validation == true) {
    addTask(taskId, taskName, taskCategory, dueDate, dueTime)
    window.location.reload();
  }
}