/**
 * Represents an Expense Logger for managing user expenses.
 * @class
 */
class ExpenseLogger {
    /**
     * Initializes a new instance of the ExpenseLogger class.
     * @constructor
     */
    constructor() {
        /**
         * An array to store logged expenses, retrieved from local storage or initialized as an empty array.
         * @type {Array<object>}
         */
        this.expenseArray = JSON.parse(localStorage.getItem("myArray")) || [];
    }

    /**
     * Logs a new expense, adds it to the expense array, updates local storage, clears the form, and redirects to the user page.
     * @param {string} description - The description of the expense.
     * @param {number} amount - The amount of the expense.
     * @param {string} category - The category of the expense.
     * @param {string} transactionDate - The date of the expense transaction.
     */
    logExpense(description, amount, category, transactionDate) {
        this.expenseArray.push({ description, amount, category, transactionDate });
        this.updateLocalStorage();
        this.clearForm();
        this.redirectToUserPage();
    }

    /**
     * Clears all expenses, displays an alert, updates local storage.
     */
    clearExpenses() {
        alert('Expenses have been cleared');
        this.expenseArray = [];
        this.updateLocalStorage();
    }

    /**
     * Updates local storage with the current expense array and initializes category percentage values.
     */
    updateLocalStorage() {
        localStorage.setItem("myArray", JSON.stringify(this.expenseArray));
        localStorage.setItem("fpercent", 0);
        localStorage.setItem("tpercent", 0);
        localStorage.setItem("hpercent", 0);
        localStorage.setItem("opercent", 0);
        localStorage.setItem("upercent", 0);
        localStorage.setItem("epercent", 0);
    }

    /**
     * Clears the expense input form by resetting the input values.
     */
    clearForm() {
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
        document.getElementById('birthdate').value = '';
    }

    /**
     * Redirects the user to the user page.
     */
    redirectToUserPage() {
        window.location.href = "userans.html"; // Check the filename here
    }
}

/**
 * An instance of the ExpenseLogger class.
 * @type {ExpenseLogger}
 */
const expenseLogger = new ExpenseLogger();

/**
 * Event listener for DOMContentLoaded to set up form and button actions.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * The expense form element.
     * @type {HTMLFormElement}
     */
    const expenseForm = document.querySelector('.expense-form');

    /**
     * The clear button element.
     * @type {HTMLButtonElement}
     */
    const clearButton = document.querySelector('.clear-button');

    /**
     * Event listener for form submission to log expenses.
     */
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const transactionDate = document.getElementById('birthdate').value;

        if (description === "" || amount === "" || category === "" || transactionDate === "" || amount === "0") {
            alert('Please enter all fields');
            return;
        }

        if (amount < 1) {
            alert('Please enter an amount above 0');
            document.getElementById('amount').value="";
            return;
        }

        expenseLogger.logExpense(description, amount, category, transactionDate);
    });

    /**
     * Event listener for the clear button to clear all expenses.
     */
    clearButton.addEventListener('click', function () {
        expenseLogger.clearExpenses();
    });
});
