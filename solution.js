const readline = require('readline');

// Classes
class Student {
    constructor(roll_number, section, food_pref) {
        this.roll_number = roll_number;
        this.section = section;
        this.food_pref = food_pref;
        this.house = section + food_pref;
    }
}

class House {
    constructor(name, capacity, noOfStudents, studentList) {
        this.studentList = studentList;
        this.name = name;
        this.capacity = capacity;
        this.noOfStudents = noOfStudents;
    }

    addStudent(student) {
        this.studentList.push(student);
        this.noOfStudents++;
    }
}

// Input testing functions
function isCapacityValid(totalCapacity) {
    return totalCapacity % 4 === 0;
}

function isHouseValid(house) {
    const validHouses = ["AV", "ANV", "BV", "BNV"];
    return validHouses.includes(house);
}

function isSectionValid(section) {
    const validSections = ["A", "B"];
    return validSections.includes(section);
}

function isfoodPrefValid(food_pref) {
    const validfood_prefs = ["V", "NV"];
    return validfood_prefs.includes(food_pref);
}

function getHousesByroll_number(houses) {
    let roll_numberWiseHouses = [];
    let i = 0;

    while (i < houses.length) {
        const house = houses[i];
        let roll_numbersHouse = [];
        let j = 0;

        while (j < house.studentList.length) {
            roll_numbersHouse.push(house.studentList[j].roll_number);
            j++;
        }

        roll_numberWiseHouses.push(roll_numbersHouse);
        i++;
    }

    return roll_numberWiseHouses;

}

// Data Arrays
let totalCapacity;
let students = [];
let houses = [];
const tasks = [];
let answer;

// Working Functions
function createHouses() {
    houses.push(new House('AV', totalCapacity / 4, 0, []));
    houses.push(new House('ANV', totalCapacity / 4, 0, []));
    houses.push(new House('BV', totalCapacity / 4, 0, []));
    houses.push(new House('BNV', totalCapacity / 4, 0, []));
    houses.push(new House('NA', students.length - totalCapacity, 0, []))
}

function registerStudent(student, totalCapacity, sequenceNumber) {
    if (!isCapacityValid(totalCapacity) || !isHouseValid(student.house) || !isSectionValid(student.section) || !isfoodPrefValid(student.food_pref)) {
        return false;
    }

    if (sequenceNumber >= totalCapacity) {
        student.house = 'NA';
        houses[4].addStudent(student);
    } else if (student.house === 'AV') {
        houses[0].addStudent(student);
    } else if (student.house === 'ANV') {
        houses[1].addStudent(student);
    } else if (student.house === 'BV') {
        houses[2].addStudent(student);
    } else if (student.house === 'BNV') {
        houses[3].addStudent(student);
    }

    return true;
}

function performHouseRegistration(students, totalCapacity) {
    createHouses();
    for (let i = 0; i < students.length; i++) {
        if (!registerStudent(students[i], totalCapacity, i)) return false;
    }
    return true;
}

function processStudentData(tasks) {
    houses = [];
    students = [];

    if (tasks[0].startsWith('init')) {
        const data = tasks[0].split(' ');
        totalCapacity = parseInt(data[1]);
    }

    for (let i = 1; i < tasks.length; i++) {
        const data = tasks[i].split(' ');
        const roll_number = parseInt(data[1]);
        const section = data[2];
        const food_pref = data[3];

        students.push(new Student(roll_number, section, food_pref));
    }

    const isRegistrationSuccess = performHouseRegistration(students, totalCapacity);
    if (!isRegistrationSuccess) return [[]];
    return getHousesByroll_number(houses);
}

function displayAnswer(answer) {
    for (let i = 0; i < answer.length; i++) {
        console.log(houses[i].name + ": " + answer[i]);
    }
}

// Maintaining the reading stream
const readStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readStream.on("line", (taskToExecute) => {
    if (taskToExecute.startsWith('fin')) {
        answer = processStudentData(tasks);
        displayAnswer(answer);
        readStream.close();
    } else {
        tasks.push(taskToExecute);
    }
});

module.exports = {
    isCapacityValid,
    isHouseValid,
    isSectionValid,
    isfoodPrefValid,
    processStudentData
};
