// Your code here
// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to record a time in event
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to record a time out event
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);

    let totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);

    return totalWages;
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

// Example usage:

// Create employee records
let employees = createEmployeeRecords([
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Supervisor", 20]
]);

// Record time in and time out events
createTimeInEvent(employees[0], "2024-07-11 0900");
createTimeOutEvent(employees[0], "2024-07-11 1700");
createTimeInEvent(employees[1], "2024-07-11 0800");
createTimeOutEvent(employees[1], "2024-07-11 1600");

// Calculate wages for a specific date
console.log(wagesEarnedOnDate(employees[0], "2024-07-11")); // Output: 200
console.log(wagesEarnedOnDate(employees[1], "2024-07-11")); // Output: 160

// Calculate payroll for all employees
console.log(calculatePayroll(employees));
