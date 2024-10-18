/**
* Retrieves the array of recorded expenses from local storage and initializes an empty array if not present.
* @type {Array}
*/
var myArray = JSON.parse(localStorage.getItem("myArray")) || [];
/**
 * Adds a new row entry to the HTMl table displaying the recorded expenses.
 * @param {string} name - Description of the transaction.
 * @param {number} amount - Amount of the transaction.
 * @param {string} category - Category of the transaction.
 * @param {string} date - Date of the transaction.
 */
function addRowToTable(name, amount, category, date) {
    var table = document.getElementById('dataTable');
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    cell1.innerHTML = name;
    cell2.innerHTML = amount + " $";
    cell4.innerHTML = date.substring(5) + "-" + date.substring(0, 4);
    cell3.innerHTML = category;
}
/**
 * Update the 'dataTable' table with rows based on each expense recorded in 'myArray'.
 * Adds each entry individually through the addRowToTable function.
 */
function updateTable() {
    var table = document.getElementById('dataTable');
    for (var i = 0; i < myArray.length; i++) {
        addRowToTable(myArray[i].description, myArray[i].amount, myArray[i].category, myArray[i].transactionDate);
    }
}
/**
 * Calculate the total amount recorded for each expense category
 * Displays the amount percentage of each expense category.
 * Displays the average amount spent per week and month
 * Displays alerts if amount is over the user-specified budget
 */
function calculatePercentages() {
    /**
     * Represents the total expense amounts that the user recorded.
     * @type {number}
     */
    var add = 0;
    /**
     * Represents the total expense value for the food category.
     * @type {number}
     */
    var food = 0;
    /**
     * Represents the total expense value for the entertainment category.
     * @type {number}
     */
    var enter = 0;
    /**
     * Represents the total expense value for the housing category.
     * @type {number}
     */
    var house = 0;
    /**
     * Represents the total expense value for the transportation category.
     * @type {number}
     */
    var trans = 0;
    /**
     * Represents the total expense value for the utilities category.
     * @type {number}
     */
    var util = 0;
    /**
     * Array of all the recorded transaction dates.
     * @type {Array}
     */
    var local = [];
    /**
     * Represents the total expense value for the other category.
     * @type {number}
     */
    var oth = 0;
    //Iterates through array of all recorded expenses and adds its amount to its corresponding category.
    for (var i = 0; i < myArray.length; i++) {
        add += Number(myArray[i]["amount"]);
        local.push(myArray[i]["transactionDate"]);
        if (myArray[i]["category"] == "food") {
            food += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "housing") {
            house += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "transportation") {
            trans += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "utilities") {
            util += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "entertainment") {
            enter += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "other") {
            oth += Number(myArray[i]["amount"]);
        }
    }
    //Add new row in the category percentage tables 
    var table = document.getElementById('percentages');
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3)
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    //Populate new row with corresponding category percentages and totals
    //Convert values to decimal format
    cell1.innerHTML = add + " dollars";
    cell2.innerHTML = parseFloat(food / add);
    cell3.innerHTML = parseFloat(enter / add);
    cell4.innerHTML = parseFloat(house / add);
    cell5.innerHTML = parseFloat(trans / add);
    cell6.innerHTML = parseFloat(util / add);
    cell7.innerHTML = parseFloat(oth / add);
    //Create local storage variables for all the different percentages
    localStorage.setItem("fpercent", cell2.innerHTML);
    localStorage.setItem("epercent", cell3.innerHTML);
    localStorage.setItem("hpercent", cell4.innerHTML);
    localStorage.setItem("tpercent", cell5.innerHTML);
    localStorage.setItem("upercent", cell6.innerHTML);
    localStorage.setItem("opercent", cell7.innerHTML);
    //Add row to table of average amount per day and month.
    var t = document.getElementById('avgamount');
    var newTable = t.insertRow(t.rows.length);
    var cell1 = newTable.insertCell(0);
    var cell2 = newTable.insertCell(1);
    cell1.innerHTML = parseFloat(add / samedates(local));
    cell2.innerHTML = parseFloat(add / sameweek(local));
    //Set local storage variables for the total expense amount for each category.
    localStorage.setItem("food", food);
    localStorage.setItem("enter", enter);
    localStorage.setItem("house", house);
    localStorage.setItem("trans", trans);
    localStorage.setItem("util", util);
    localStorage.setItem("oth", oth);
    //Retrives the weekly budget and monthly budget variables
    var wBudget = localStorage.getItem("weekbudget");
    var mBudget = localStorage.getItem("monthbudget");
    budget(wBudget, mBudget);
}
/**
 * Event listener for when the DOM content has been loaded.
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    updateTable();
    calculatePercentages();
});
/**
* Count the number of unique dates in an array of date strings.
* Dates comprehended by ISO week date system
* @param {Array} Array - Array of date strings.
 * @returns {number} - Number of unique dates.
*/
function samedates(Array) {
    /**
    * Array to store unique dates.
    * @type {Array}
    */
    const same = [];
    /**
    * Counter for the number of unique dates.
    * @type {number}
    */
    let counter = 0;
    Array.forEach(dateStr => {
        //Creating new date object for each transaction date in 'Array'.
        const dateObj = new Date(dateStr);
        dateObj.setDate(dateObj.getDate() + 1);
        // Extracting year, month, and day components from the date.
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        // Creating a standardized date string (YYYY-MM-DD)
        const dateKey = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        /**
        * Boolean that checks if the date is already in the 'same' array.
        * @type {boolean}
        */
        bool = true;
        for (let i = 0; i < same.length; i++) {
            if (dateKey == same[i]) {
                bool = false;
            }
        }
        // If the date is not in the 'same' array, add it and increment the counter.
        if (bool) {
            same.push(dateKey);
            counter += 1;
        }
    });
    // Return the count of unique days.
    return counter;
}
/**
* Calculates the number of unique weeks represented by the array of dates.
* Weeks are comprehended based on the ISO week date system.
*
* @param {Array<string>} dateArray - An array of date strings.
 * @returns {number} - Counter of unique weeks in the date array.
*/
function sameweek(dateArray) {
    /**
    * Array to store unique weeks.
    * @type {Array}
    */
    const group = [];
    /**
    * Counter for the number of unique weeks.
    * @type {number}
    */
    let counter = 0;

    dateArray.forEach(date => {
        // Create a new date object.
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() + 1);
        // Extract year and week number.
        const year = dateObj.getFullYear();
        const weekNum = getWeek(dateObj) - 1;
        // Generating a key for the week.
        const weekKey = `${year}-W${weekNum < 10 ? '0' : ''}${weekNum}`;
        // Check if the week key is already in the 'group' array.
        let bool = true;
        for (let i = 0; i < group.length; i++) {
            if (weekKey === group[i]) {
                bool = false;
            }
        }
        // If no other dates in the 'group' array have the same week key,
        // add the week key to the array and increment the counter.
        if (bool) {
            group.push(weekKey);
            counter += 1;
        }
    });
    // Return the count of unique weeks
    return counter;
}
/**
* Calculates and tracks expenses on a weekly and monthly basis, providing alerts if budgets are exceeded.
*
* @function budget
*/
function budget(wBudget, mBudget) {
    /** Number of unique weeks.
     * @type {number} */
    var weekcounter = 0;
    /** Number of unique months.
     * @type {number} */
    var monthcounter = 0;
    /** Array of all the different weeks.
     * @type {Array} */
    var weekArray = {};
    /** Array of all the different months.
     * @type {Array} */
    var monthArray = {};
    // Iterating through each expense transaction in myArray.
    myArray.forEach((t) => {
        var am = t.amount;
        var td = t.transactionDate;
        //Create new object with the transaction date.
        //Adjust date to start from 1 instead of 0.
        var obj = new Date(td);
        obj.setDate(obj.getDate() + 1);
        //week number of transaction.
        key = getWeek(obj) - 1;
        //month number of transaction.
        key2 = obj.getMonth() + 1;
        //If week exists in week array increment it by the expense amount of t
        if (weekArray[key]) {
            weekArray[key] += parseFloat(am);
        } 
        else {
            weekArray[key] = parseFloat(am);
        }
        //If month exists in month array increment it by the expense amount of t
        if (monthArray[key2]) {
            monthArray[key2] += parseFloat(am);
        } 
        else {
            monthArray[key2] = parseFloat(am);
        }
        // Checking if weekly budget is exceeded and displaying an alert
        if (weekArray[key] > parseFloat(wBudget) && weekcounter == 0) {
            alert("You have exceeded your weekly budget");
            weekcounter += 1
        }
        // Checking if monthly budget is exceeded and displaying an alert
        if (monthArray[key2] > parseFloat(mBudget) && monthcounter == 0) {
            alert("You have exceeded your monthly budget");
            monthcounter += 1
        }
    });
}
/**
* Get function to determine the ISO week number of a given date.
*
* @param {Date} date - The date object.
* @returns {number} - The ISO week number.
*/
function getWeek(date) {
    //Creating a new date object
    const target = new Date(date.valueOf());
    //Calculate the day of the week
    const day = (date.getDay() + 7) % 7;
    // Set the target date to the Thursday of the current week.
    target.setDate(target.getDate() - day + 3);
    const first = target.valueOf();
    // Set the target date to the first day of the current year.
    target.setMonth(0, 1);
    // Adjust to the first occurrence of a Thursday in the year if it is needed.
    if (target.getDay() !== 0) {
        target.setMonth(0, 1 + ((0 - target.getDay()) + 7) % 7);
    }
    // Calculate the ISO week number based on the Thursday of the week.
    return 1 + Math.ceil((first - target) / 604800000);
}