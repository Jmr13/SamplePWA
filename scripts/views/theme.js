"use strict";

function Theme() {
	if (window.localStorage.getItem('theme', 'dark')) { 
		document.body.classList.add("dark");
  } 
	else { 
    document.body.classList.remove("dark");
	}
}

Theme();