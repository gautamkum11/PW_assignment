const readline = require('readline');

// Classes
class Student {
    constructor(rollNumber, section, foodPreference) {
        this.rollNumber = rollNumber;
        this.section = section;
        this.foodPreference = foodPreference;
        this.house = section + foodPreference;
    }
}

class House {
    constructor(name, capacity, numberOfStudents, studentList) {
        this.name = name;
        this.capacity = capacity;
        this.numberOfStudents = numberOfStudents;
        this.studentList = studentList;
    }

    addStudent(student) {
        this.studentList.push(student);
        this.numberOfStudents++;
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

function isFoodPreferenceValid(foodPreference) {
    const validFoodPreferences = ["V", "NV"];
    return validFoodPreferences.includes(foodPreference);
}

function getHousesByRollNumber(houses) {
    let rollNumberWiseHouses = [];
    let i = 0;

    while (i < houses.length) {
        const house = houses[i];
        let rollNumbersHouse = [];
        let j = 0;

        while (j < house.studentList.length) {
            rollNumbersHouse.push(house.studentList[j].rollNumber);
            j++;
        }

        rollNumberWiseHouses.push(rollNumbersHouse);
        i++;
    }

    return rollNumberWiseHouses;

}

// Data
let totalCapacity;
let students = [];
let houses = [];
const tasks = [];
let answer;

// Logical Functions
function createHouses() {
    houses.push(new House('AV', totalCapacity / 4, 0, []));
    houses.push(new House('ANV', totalCapacity / 4, 0, []));
    houses.push(new House('BV', totalCapacity / 4, 0, []));
    houses.push(new House('BNV', totalCapacity / 4, 0, []));
    houses.push(new House('NA', students.length - totalCapacity, 0, []))
}

function registerStudent(student, totalCapacity, sequenceNumber) {
    if (!isCapacityValid(totalCapacity) || !isHouseValid(student.house) || !isSectionValid(student.section) || !isFoodPreferenceValid(student.foodPreference)) {
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
        const rollNumber = parseInt(data[1]);
        const section = data[2];
        const foodPreference = data[3];

        students.push(new Student(rollNumber, section, foodPreference));
    }

    const isRegistrationSuccessful = performHouseRegistration(students, totalCapacity);
    if (!isRegistrationSuccessful) return [[]];
    return getHousesByRollNumber(houses);
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
    isFoodPreferenceValid,
    processStudentData
};
