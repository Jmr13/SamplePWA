"use strict";

import { getAllTask } from "../model/taskmodel.js";

// Display the date today
var today = new Date();
var year = today.getFullYear();

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

var allTask = await getAllTask();
var allCompletedTask = [];
allTask.filter((task) => {
  if(task.isDone == 1) {
    allCompletedTask.push(task);
  }
});

function generateColor() {
  const availableColors = ['#009B72', '#F26430', '#009DDC', '#FCDE9C', '#A71D31']
  return availableColors[Math.floor(Math.random() * 4)];
}

function generateCharts() {

  let allTaskMonthCompleted = [];
  let allCategoryCompleted = [];
  
  // Create data for bar chart
  var barLabel = [];
  var bardata = [];
  var barBackgroundColor = [];
  	      
  // Create data for pie chart
  var pieLabel = [];
  var piedata = [];
  var pieBackgroundColor = [];
  
  // generate background color
  for(let i = 0 ; i <= allCompletedTask.length ; i++) {
    barBackgroundColor.push(generateColor());
    pieBackgroundColor.push(generateColor());
  }
  
  // Compare the year in task list and year today
  allCompletedTask.forEach((task) => {
    if(task.dueDate.slice(0,4) == year){
      // For bar chart
      allTaskMonthCompleted.push(task.dueDate);
      // For pie chart
      pieLabel.push(task.category);
    }
  })
  
  // Store all month of task
  allTaskMonthCompleted.forEach((taskMonth) => {
    barLabel.push(getMonth(taskMonth.slice(5,7)));
  })
  
  // Sort month by their order. This duplicates months.
  // If sortType == 1, then sort the array by month. Else, category
  function sortByType(array, sortType) {
    let type;
    if(sortType == 1) {
      type = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    } else {
      type = ['Personal', 'Health', 'Work', 'Shopping'];
    }
    array.sort(function(a, b){
        return type.indexOf(a) - type.indexOf(b);
    });
  }
  
  sortByType(barLabel, 1);
  sortByType(pieLabel, 2);
  
  // Count the appearance of month/category in the array
  const countMonth = [];
  const countCategory = [];
  
  barLabel.forEach(function (month) { 
    countMonth[month] = (countMonth[month] || 0) + 1; 
  });
  pieLabel.forEach(function (category) { 
    countCategory[category] = (countCategory[category] || 0) + 1; 
  });
  
  // Remove all duplicates
  barLabel = [...new Set(barLabel)];
  barLabel.forEach(function (index, month) { 
    bardata.push(countMonth[index]);
  });
  pieLabel = [...new Set(pieLabel)];
  pieLabel.forEach(function (index, month) { 
    piedata.push(countCategory[index]);
  });
  
  // Bar Chart
  var barchart = document.getElementById('month').getContext('2d');
  
  // Generate bar chart
  var bar = new Chart(barchart, {
    type: 'bar',
    fontColor: altColor,
    data: {
  	  labels: barLabel,
  	  datasets: [{
  	    label: ['Month'],
  	    data: bardata,
  	    backgroundColor: barBackgroundColor,
  	    hoverOffset: 4,
  	  }]
    },
    options: {
      title: {
        display: true,
        text: "This year's Completed task(s) by Month",
        layout: {
          padding: {
          	bottom: 50
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            userCallback: function(label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }
            },
          }
        }],
      },
      responsive: true,
    }
  });
  
  // Pie chart
  var piechart = document.getElementById('category').getContext('2d');
  	    
  // Generate the pie chart
  var pie = new Chart(piechart, {
    type: 'doughnut',
    data: {
  	  labels: pieLabel,
  	  datasets: [{
  	    label: 'Category of completed task(s)',
  	    data: piedata,
  	    backgroundColor: pieBackgroundColor,
  	    hoverOffset: 4
  	  }]
    },
    options: {
      title: {
        display: true,
        text: "Category of Completed task(s) this year",
        layout: {
          padding: {
          	bottom: 50
          }
        }
      },
      responsive: true,
    },
  });
}

var style = getComputedStyle(document.body);
var altColor = style.getPropertyValue('--alt-color');

Chart.defaults.global.defaultFontColor = altColor;

if(allCompletedTask.length != 0) {
  generateCharts();
}
else {
  document.querySelector('#statistics').classList.remove('none');
  document.querySelector('#statisticstext').classList.remove('none');
}