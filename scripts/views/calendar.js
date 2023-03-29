import { getAllTask, getTask} from "../model/taskmodel.js";

// Display the date today
var today = new Date();
var day = today.getDate();
var month = today.getMonth(); 
var year = today.getFullYear();

// For next and previous button
var currentYear = today.getFullYear();
var currentMonth = today.getMonth();
var selectedDate = `${currentYear}-${currentMonth}-01`;
var daysInMonth;

function getWeek(week) {
	return week == 0 ? "Sunday"
		: week == 1 ? "Monday"
		: week == 2 ? "Tuesday"
		: week == 3 ? "Wednesday"
		: week == 4 ? "Thursday"
		: week == 5 ? "Friday"
		: "Saturday";
}

function getMonth(month) {
	return month == 0 ? "January"
		: month == 1 ? "February"
		: month == 2 ? "March"
		: month == 3 ? "April"
		: month == 4 ? "May"
		: month == 5 ? "June"
		: month == 6 ? "July"
		: month == 7 ? "August"
		: month == 8 ? "September"
		: month == 9 ? "October"
		: month == 10 ? "November"
		: "December";
}

function prev(){
	// Decrement month and year
	if(currentMonth <= 0) {
		currentMonth = 11;
		currentYear -= 1;
	}
	else {
		currentMonth -= 1;
	}

	document.querySelector(".currentMonth").textContent = getMonth(currentMonth);
	document.querySelector(".headeryear").textContent = currentYear;

	selectedDate = `${currentYear}-${currentMonth}-01`;
	// Get the number of days in the selected month
	daysInMonth = getDaysInMonth(selectedDate);
	//console.log(daysInMonth)
	generateDates(daysInMonth);
	highlightCurrentDate(currentYear, currentMonth);
	highlightDueDate();
}

function next(){
	// Increment Month and Year
	if(currentMonth >= 11) {
		currentMonth = 0;
		currentYear += 1;
	}
	else {
		currentMonth += 1;
	}

	document.querySelector(".currentMonth").textContent = getMonth(currentMonth);
	document.querySelector(".headeryear").textContent = currentYear;

	// Get only the first day of month
	selectedDate = `${currentYear}-${currentMonth}-01`;
	// Get the number of days in the selected month
	daysInMonth = getDaysInMonth(selectedDate);
	//
	(daysInMonth)
	generateDates(daysInMonth);
	highlightCurrentDate(currentYear, currentMonth);
	highlightDueDate();
}

function getDaysInMonth() {
	return new Date(currentYear, currentMonth + 1, 0).getDate();
}

function generateDates(days) {
	// Get the wrapper for dates
	var daysWrapper = document.querySelector(".days");
	daysWrapper.innerHTML = '';

	// Get the week day of current date
	var date = new Date(`${getMonth(currentMonth)} 1, ${currentYear}`);
	var dayOfWeek = date.getDay();
	// Fill starting empty cells
	for(let i=0; i < dayOfWeek; i++) {
		const day = document.createElement("li");
		day.setAttribute(`class`, `_`);
		daysWrapper.appendChild(day);
	}

	// Fill dates
	for(let i=1; i <= days; i++) {
		const day = document.createElement("li");
		day.textContent = i; 
		day.setAttribute(`class`, `_${i} notactive`);
		daysWrapper.appendChild(day);
	}
}

function highlightCurrentDate(currentYear, currentMonth) {
	if(currentYear == year && currentMonth == month){
		const highlightElement = document.querySelector(`._${day}`);
		highlightElement.classList.add('active');
	}
}

async function displayTaskInfo() {
	const task = await getTask(this.getAttribute('data-id'));
	console.log(task)
	document.querySelector('.taskName').textContent = task.name; 
	document.querySelector('.taskCategory').textContent = task.category; 
  
	document.querySelector('.taskDuedate').textContent = `${getMonth(task.dueDate.slice(5, 7)-1)} ${task.dueDate.slice(8,10)}, ${task.dueDate.slice(0, 4)}`; 
	document.querySelector('.taskDuetime').textContent = timeConvert(task.dueTime); 
	toggleModal('modalinfo');
}
  
async function highlightDueDate() {
  const allTask = await getAllTask();
  let filteredDueDate = [];

  allTask.filter((task) => {
    if(task.isDone == 0) {
      if(currentYear == task.dueDate.slice(0, 4) && 
      currentMonth + 1 == task.dueDate.slice(5, 7)) {
        const element = document.querySelector(`._${task.dueDate.slice(8,10)}`);
        element.classList.add('highlight');
        element.setAttribute('data-id', task.id);
        element.setAttribute('title', task.id);
        element.addEventListener('click', displayTaskInfo);
      }
    }
  });
}

const elementYear = document.querySelector(".year");
const elementMonth = document.querySelector(".month");
const elementWeek = document.querySelector(".week");
const elementDate = document.querySelector(".date");

elementYear.textContent = year;
elementMonth.textContent = getMonth(month);
elementWeek.textContent = getWeek(today.getDay());
elementDate.textContent = day;

document.querySelector(".headeryear").textContent = currentYear;
document.querySelector(".currentMonth").textContent = getMonth(currentMonth);

// Add click listener to buttons
document.querySelector('#prev').addEventListener('click', prev);
document.querySelector('#next').addEventListener('click', next);

generateDates(getDaysInMonth());
highlightCurrentDate(currentYear, currentMonth);
highlightDueDate();