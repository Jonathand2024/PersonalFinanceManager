/**
 * Represents a budget with weekly and monthly values.
 * @class
 */
class Budget {
    /**
     * Initializes a new instance of the Budget class.
     * @constructor
     */
    constructor() {
        /**
         * The weekly budget value.
         * @type {number}
         */
        this.weeklyBudget = 0;

        /**
         * The monthly budget value.
         * @type {number}
         */
        this.monthlyBudget = 0;
    }

    /**
     * Sets the weekly and monthly budgets.
     * @param {number} weekly - The weekly budget value.
     * @param {number} monthly - The monthly budget value.
     */
    setBudgets(weekly, monthly) {
        this.weeklyBudget = weekly;
        this.monthlyBudget = monthly;
    }
}

/**
 * Represents a form for handling budget inputs.
 * @class
 */
class BudgetForm {
    /**
     * Initializes a new instance of the BudgetForm class.
     * @constructor
     * @param {Budget} budgetInstance - An instance of the Budget class.
     */
    constructor(budgetInstance) {
        /**
         * The budget instance associated with the form.
         * @type {Budget}
         */
        this.budget = budgetInstance;
    }

    /**
     * Handles the form submission, updating the associated budget instance.
     */
    handleForm() {
        const weeklyBudgetInput = document.getElementById('weeklyBudget');
        const monthlyBudgetInput = document.getElementById('monthlyBudget');
        const weeklyBudget = parseFloat(weeklyBudgetInput.value);
        const monthlyBudget = parseFloat(monthlyBudgetInput.value);

        this.budget.setBudgets(weeklyBudget, monthlyBudget);
    }
}

/**
 * An instance of the Budget class.
 * @type {Budget}
 */
const budgetInstance = new Budget();

/**
 * An instance of the BudgetForm class.
 * @type {BudgetForm}
 */
const budgetFormInstance = new BudgetForm(budgetInstance);

/**
 * Handles the budget form submission and performs validation.
 */
function handleBudgetForm() {
    budgetFormInstance.handleForm();

    if (budgetInstance.weeklyBudget < 0 || isNaN(parseFloat(budgetInstance.weeklyBudget))) {
        alert("Please enter a budget that is not negative and a real numerical value");
        document.getElementById('weeklyBudget').value="";
        document.getElementById('monthlyBudget').value="";
        return;
    }

    if (budgetInstance.monthlyBudget < 0 || isNaN(parseFloat(budgetInstance.monthlyBudget))) {
        alert("Please enter a budget that is not negative and a real numerical value");
        document.getElementById('monthlyBudget').value="";
        document.getElementById('weeklyBudget').value="";
        return;
    }

    // Store budget values in local storage
    localStorage.setItem("weekbudget", budgetInstance.weeklyBudget);
    localStorage.setItem("monthbudget", budgetInstance.monthlyBudget);

    // Display an alert with the entered budget values
    alert(`Weekly Budget: $${budgetInstance.weeklyBudget}\nMonthly Budget: $${budgetInstance.monthlyBudget}`);
}

/**
 * Adds a 'clicked' class to the button element when clicked.
 */
function buttonClick() {
    const button = document.querySelector('button');
    button.classList.add('clicked');
}

/**
 * Removes the 'clicked' class from the button element when released.
 */
function buttonRelease() {
    const button = document.querySelector('button');
    button.classList.remove('clicked');
}
