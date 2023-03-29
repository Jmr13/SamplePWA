"use strict";

import { clearTask } from "../model/taskmodel.js";

const darkmode = document.querySelector('.darkmode');
const moon = document.querySelector('.ri-moon-line');
const sun = document.querySelector('.ri-sun-line');
const icontext = document.querySelector('.icontext');


function updateTheme() {
	if (window.localStorage.getItem('theme','dark')) { 
		darkmode.classList.add("slide");
		moon.classList.add("none");
		sun.classList.remove("none");
		icontext.textContent = "Light"
  } 
	else { 
    darkmode.classList.remove("slide");
    moon.classList.remove("none");
		sun.classList.add("none");
		icontext.textContent = "Dark"
	}
}

updateTheme();

function changeTheme() {
	if (window.localStorage.getItem('theme', 'dark')) { 
		window.localStorage.setItem("theme", "");
		
		darkmode.classList.remove("slide");
		
		moon.classList.remove("none");
		sun.classList.add("none");
		
		icontext.textContent = "Dark"
  } 
	else { 
		window.localStorage.setItem("theme", "dark");
		
		darkmode.classList.add("slide");

		moon.classList.add("none");
		sun.classList.remove("none");
		
		icontext.textContent = "Light"
	}
	Theme();
}
  
function resetIcon() {
	const restarticon = document.querySelector('.ri-restart-line');
  restarticon.classList.toggle('rotate');
  
	const modalcontainer = document.querySelector(".modalreset");
  modalcontainer.classList.toggle("flex");
}

function clearAllTask() {
  clearTask();
  window.location.reload();
}

document.querySelector('.darkmode').addEventListener('click', changeTheme);
document.querySelector('.reset').addEventListener('click', resetIcon);
document.querySelector('.resetAll').addEventListener('click', clearAllTask);