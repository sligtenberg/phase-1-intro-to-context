// Your code here
function createEmployeeRecord(input) {
    return {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (input) {
    return input.map(createEmployeeRecord)
}

function createTimeInEvent (employeeRecordObj, date) {
    employeeRecordObj.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.slice(11)),
        date: date.slice(0, 10)
    })
    return employeeRecordObj
}

function createTimeOutEvent (employeeRecordObj, date) {
    employeeRecordObj.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.slice(11)),
        date: date.slice(0, 10)
    })
    return employeeRecordObj
}

function hoursWorkedOnDate (employeeRecordObj, date) {
    const timeInForDate = findEventFromDate(employeeRecordObj.timeInEvents, date).hour
    const timeOutForDate = findEventFromDate(employeeRecordObj.timeOutEvents, date).hour
    return ((timeOutForDate - timeInForDate)/100)
}

// this function takes an array of time events and a date and returns the time event whose date matches the date given as an arg
function findEventFromDate (timeEvent, date) {
    return timeEvent.find(obj => obj.date === date)
}

function wagesEarnedOnDate (employeeRecordObj, date) {
    return hoursWorkedOnDate(employeeRecordObj, date) * employeeRecordObj.payPerHour
}

function allWagesFor (employeeRecordObj) {
    let totalWages = 0;
    for (let timeInEvent of employeeRecordObj.timeInEvents) {
        totalWages = totalWages + wagesEarnedOnDate(employeeRecordObj, timeInEvent.date)
    }
    return totalWages
}

function calculatePayroll (array) {
    let payArray = array.map(allWagesFor)
    let totalOwed = 0
    for (let employeeWage of payArray) {
        totalOwed = totalOwed + employeeWage
    }
    return totalOwed
}