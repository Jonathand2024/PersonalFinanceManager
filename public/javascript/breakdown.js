/**
 * Event listener for the DOMContentLoaded event. Executes when the HTML document has been completely loaded and parsed.
 */
document.addEventListener("DOMContentLoaded", function() {
    // Check if the user has logged any expenses.
    if (localStorage.getItem("fpercent") + localStorage.getItem("epercent") + localStorage.getItem("hpercent") + localStorage.getItem("tpercent") + localStorage.getItem("upercent") + localStorage.getItem("opercent") == 0) {
        alert("User has not logged any expenses");
    }       
    // Get the pie chart elements.
    var userChart = document.getElementById("PieChart");
    var averageChart = document.getElementById("PieChart2");
    // Set up data and labels for user specified pie chart.
    const data = {
        //Labels are all the expense categories
        labels: ["Food", "Entertainment", "Housing", "Transportation", "Utilities", "Other"],
        //Data is the category expense percentages per amount.
        datasets: [{
            data: [localStorage.getItem("fpercent"), localStorage.getItem("epercent"), localStorage.getItem("hpercent"), localStorage.getItem("tpercent"),
            localStorage.getItem("upercent"), localStorage.getItem("opercent")],
            backgroundColor: ["blue", "black", "purple", "yellow", "red", "orange"]
        }]
    };
    // Create the graph layout and type of Plotly Chart.
    const userPieChart = new Chart(userChart, {
        type: 'pie',
        data: data,
        options: {
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 4000
            }
        }
    });
    // Set up data and labels for average american pie chart.
    var data2 = {
        //Percentages are constant and obtained from US Bureau of Labor Statistics.
        labels: ["Food", "Entertainment", "Housing", "Transportation", "Utilities", "Other"],
        datasets: [{
            data: [12.8, 4.7, 33.33, 16.8, 33.33, 4.1],
            backgroundColor: ["blue", "black", "purple", "yellow", "red", "orange"]
        }]
    };
    // Create the graph layout and type of Plotly Chart.
    var averagePieChart = new Chart(averageChart, {
        type: 'pie',
        data: data2,
        options: {
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 4000
            }
        }
    });
});
/**
 * Function to define display style of Reset, Submit, and Profit elements.
 * Runs when Reset button clicked.
 * Hides Reset Button and Profit value and Shows Submit Button
 */
function res() {
    document.getElementById("profit").style.display = "none";
    document.getElementById("R").style.display = "none";
    document.getElementById("S").style.display = "inline-block";
    var canvas = document.getElementById("BarChart");
    // Remove the canvas element's parent node from the DOM.
    canvas.parentNode.removeChild(canvas);
    //Set value in input box as none.
    document.getElementById("input").value = "";
}
/**
 * Function to define display style of Reset, Submit, and Profit elements.
 * Runs when Submit button clicked.
 * Hides Submit Button and Shows Reset Button and Displays Bar Graph of 
 * User Profits and Expenses per month.
 */
function sub() {
    document.getElementById("S").style.display = "none";
    document.getElementById("R").style.display = "inline-block";
    // Create a new canvas element for the bar chart
    var canvas = document.createElement("canvas");
    canvas.id = "BarChart";
    canvas.width = 200;
    canvas.height = 100;
    //Get div element with id 'bar' and clears existing content within it.
    //Append the created canvas element to this "bar" element.
    var barDiv = document.getElementById("bar");
    barDiv.innerHTML = "";
    barDiv.appendChild(canvas);
    var c = document.getElementById("BarChart");
    if (!c) {
        alert("Failed to create canvas element.");
        return;
    }
    //Retrive user input value of estimated monthly income.
    var monthIncome = document.getElementById("input").value;
    // Validate user input for a positive US $ amount.
    if (parseFloat(monthIncome) < 0 || isNaN(parseFloat(monthIncome)) == true) {
        document.getElementById("R").style.display = "none";
        document.getElementById("S").style.display = "inline-block";
        alert('Please enter a positive US $ Amount');
        document.getElementById("input").value = "";
        return;
    }
    /**
     * Retrieves the array of recorded expenses from local storage and initializes an empty array if not present.
     * @type {Array}
     */
    var a = JSON.parse(localStorage.getItem("myArray")) || [];
    /**
     * Array of the user-specified income per month
     * @type {Array}
     */
    var arr = [];
    //Populate array first with value 0 for each month.
    arr.push({ "01": 0 });
    arr.push({ "02": 0 });
    arr.push({ "03": 0 });
    arr.push({ "04": 0 });
    arr.push({ "05": 0 });
    arr.push({ "06": 0 });
    arr.push({ "07": 0 });
    arr.push({ "08": 0 });
    arr.push({ "09": 0 });
    arr.push({ "10": 0 });
    arr.push({ "11": 0 });
    arr.push({ "12": 0 });
    // Iterate through array 'a' and add each expense amount to their corresponding month.
    for (var i = 0; i < a.length; i++) {
        var month = a[i]["transactionDate"].substring(5, 7);
        var index = arr.findIndex(item => item[month]);
        for (var j = 0; j < arr.length; j++) {
            if (month in arr[j]) {
                var value = parseInt(arr[j][month]) + parseInt((a[i]["amount"]));
                arr[j][month] = value;
            }
        }
    }
    // Set up data and labels for monthly Income and Expense bar chart.
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"],
        //Since monthly income the amount will be the same for every month.
        datasets: [{
            label: "Income (US $)",
            data: [parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome),
            parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome), parseFloat(monthIncome)],
            backgroundColor: "blue"
        },
        {
            label: "Expenses (US $)",
            data: [arr[0]["01"], arr[1]["02"], arr[2]["03"], arr[3]["04"], arr[4]["05"], arr[5]["06"],
            arr[6]["07"], arr[7]["08"], arr[8]["09"], arr[9]["10"], arr[10]["11"], arr[11]["12"]],
            backgroundColor: "red"
        }]
    };
    // Get the 2D context for the canvas
    var ctx = c.getContext('2d');
    if (!ctx) {
        alert("Failed to get context for canvas element.");
        return;
    }
    var options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };
    // Create the bar chart using Plotly graph.
    const bar = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            //Animating drawing of bar chart.
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 4000
            }
        }
    });
    // Calculate and display average monthly profit
    var sum = 0;
    //Iterate through array dictionary 'arr'.
    for (var index of arr) {
        for (var key in index) {
            sum += parseFloat(monthIncome) - index[key];
        }
    }
    //Display the 'profit' div element and define its inner html.
    document.getElementById("profit").style.display = "block";
    document.getElementById("profit").innerHTML = "Your average monthly profit is " + (sum / 12.0).toFixed(2) + " $"; 
}


