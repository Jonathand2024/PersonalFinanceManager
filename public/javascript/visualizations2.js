/**
 * Event listener for when the DOM content is fully loaded.
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    // Retrieves the array of recorded expenses from local storage and initializes an empty array if not present.
    var myArray = JSON.parse(localStorage.getItem("myArray")) || [];

    /**
     * Function that compares two recorded expenses based on their transaction date.
     *
     * @param {Object} a - First transaction object
     * @param {Object} b - Second transaction object
     * @returns {number} - Comparison result for sorting
     */
    function compare(a, b) {
        const A = new Date(a.transactionDate);
        const B = new Date(b.transactionDate);
        return A - B;
    }
    // Sort array of all the recorded expenses based on the transaction date.
    myArray.sort(compare);
    // Initialize arrays and object for processing and plotting data.
    var dates = [];
    var values = [];
    var Maps = {};

    // Iterate through all the recorded expenses to store each amount value and transaction date.
    for (var i = 0; i < myArray.length; i++) {
        var d = myArray[i]["transactionDate"];
        var v = parseFloat(myArray[i]["amount"]);
        /* Check if transaction date is already in 'Maps'. 
        If yes accumulate the corresponding expense amount or if not add a new entry and push array in 'dates'.
        */
        if (Maps.hasOwnProperty(d)) {
            Maps[d] += v;
        } else {
            Maps[d] = v;
            dates.push(d);
        }
    }
    // Populate array based on all the recorded expense amounts.
    for (var i = 0; i < dates.length; i++) {
        values.push(Maps[dates[i]]);
    }
    // Convert array with date strings to Date objects.
    var dateObjects = dates.map(date => new Date(date + "T00:00:00"));
    /**
     * Extracts array of all the recroded expense amounts from the expenses array.
     * @type {Array}
     */
    const trace = [{
        x: dateObjects,
        y: values,
        type: 'scatter',
        mode: 'lines+markers'
    }];
    /**
     * Represents the graph type and layout for the Plotly chart.
     * @type {Object}
     */
    const layout = {
        font: { color: 'black', family: 'Arial', weight: 'bold' },
        title: 'Total Expense Amount Tracked Each Day',
        xaxis: {
            title: 'Dates',
            //X axis values will be displayed in date format.
            type: 'date',
            tickformat: '%m-%d-%Y',
            tickvals: dateObjects,
            tickfont: {
                color: 'black'
            }
        },
        yaxis: {
            title: 'Expense Amount (US $)'
        }
    };
    //Adjusts graph to window size
    var config={responsive:true};
    /**
     * Check if the div element with id 'plot' exists.
     * If yes creates a new plot using Plotly library.
     * If not will give out error.
     * @type {HTMLElement}
     */
    var plotElement = document.getElementById('plot');
    if (plotElement) {
        Plotly.newPlot('plot', trace, layout, config);
    } 
    else {
        console.error("No DOM element with id 'plot' exists on the page.");
    }
});
