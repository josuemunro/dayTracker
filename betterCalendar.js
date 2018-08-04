function loadcalendar(changeMonth) {
	var today;
	if (typeof (Storage) !== "undefined") { //checks if browser is compatible with storage
		if (sessionStorage.theDate) {
			today = new Date(sessionStorage.theDate);
		} else {
			today = new Date();
		}
		today.setMonth(today.getMonth() + changeMonth);
		sessionStorage.theDate = today; //updates session storage
		var month = today.getMonth() + 1; //adds 1 since Date() uses [0-11] index and calendar uses [1-12] index
		var year = today.getFullYear();
		var currentMonthandYear = document.getElementById("currentMonthandYear");
        currentMonthandYear.innerHTML = calendar.month_name[month] + " " + year; //updates header on page
		var monthrange = calendar.monthrange(year, month); //array has [which day of week it starts on [0-6], how many days in month]
		var activeMonth = new Array(monthrange[0]).fill(""); //this array now contains the empty slots at the start of the calendar

		for (i = 0; i <= monthrange[1] - 1; i++) {
			activeMonth.push(i + 1) // fills up the rest of the array with the days of the month
		}
		//active month now contains both the empty slots at the start of each month and all the days of each month

		//Creating the calendar
		var calendarContent = "";
		calendarContent += "<tr>"
		for (index = 0; index < activeMonth.length; index++) {
			if (index % 7 === 0 && index != 0) { // Creates a new row at the end of a week
				calendarContent += "</tr>" + "<tr>"
			}
			calendarContent += "<td id=\"" + activeMonth[index] + "\" onclick=\"myCell(this, " + month + ")\">" + activeMonth[index] + "</td>" //creates each slot in the calendar
		}
		calendarContent += "</tr>" //finishes the last table row
		document.getElementById("maincalendar").innerHTML = calendarContent;
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
	}
}

function getDynamicData(){
    document.body.innerHTML += "<h1>" + sessionStorage.dynamicDate + "</h1>"
}

function myCell(element, month) {
    sessionStorage.dynamicDate= (calendar.month_name[month] + " " + element.id);
    window.location.assign("dynamicDate.html");
}