/**
 * Event listener for when the DOM content has been loaded.
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
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
     * Represents the total expense value for the other category.
     * @type {number}
     */
    var o = 0;
    /**
     * Retrieves the array of recorded expenses from local storage and initializes an empty array if not present.
     * @type {Array}
     */
    var myArray = JSON.parse(localStorage.getItem("myArray")) || [];
    /**
     * Iterates through each recorded expense in the array and updates its corresponding category variables.
     */
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]["category"] == "food") {
            food += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "housing") {
            house += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "transportation") {
            trans += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "utilities") {
            util += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "entertainment") {
            enter += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "other") {
            o += parseFloat(myArray[i]["amount"]);
        }
    }
    /**
     * Represents an array dictionary of all the expenses grouped by category.
     * @type {Array}
     */
    const expenses = [
        { category: 'Food', amount: food },
        { category: 'Transportation', amount: trans },
        { category: 'Entertainment', amount: enter },
        { category: 'Utilities', amount: util },
        { category: 'Housing', amount: house },
        { category: 'Other', amount: o }
    ];
    /**
     * Extracts array of all the expense category names from the expenses array.
     * @type {Array}
     */
    const categories = expenses.map(expense => expense.category);
    /**
     * Extracts array of all the recroded expense amounts from the expenses array.
     * @type {Array}
     */
    const amounts = expenses.map(expense => expense.amount);
    /**
     * Represents the graph type and data being plotted for the Plotly chart.
     * @type {Array}
     */
    const data = [{
        type: 'bar',
        x: categories,
        y: amounts,
        marker: {
            color: "rgb(0,0,0)",
            opacity: 0.7,
        }
    }];
    /**
     * Represents the graph layout for the Plotly chart.
     * @type {Object}
     */
    const layout = {
        font: { color: 'black', family: 'Arial', weight: 'bold' },
        title: 'Expense Amount Tracked per Category',
        xaxis: { title: 'Expense Category' },
        yaxis: { title: 'Expense Amount (US $)' }
    };
    //Adjusts graph to window size
    var config={responsive:true};
    /**
     * Checks if div element with id 'expense-chart' exists and initializes the Plotly chart. 
     * If not will give out error.
     * @type {HTMLElement}
     */
    var expenseChartElement = document.getElementById('expense-chart');
    if (expenseChartElement) {
        Plotly.newPlot('expense-chart', data, layout,config);
    } 
    else {
        console.error("No DOM element with id 'expense-chart' exists on the page.");
    }
});
