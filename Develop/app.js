const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Node packages:
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty team to push new team members to
let teamList = [];

// ask questions, THEN create and push to teamList, THEN call addMember function
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your id number?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office phone number?"
        }
    ]).then(function (answers) {
        const manager = new Manager(answers.name, parseInt(answers.id), answers.email, answers.officeNumber)
        teamList.push(manager)
        console.log(teamList);
        addMember();
    })
    .catch(function (err) {
        console.log(err);
    });
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id number?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github username?"
        }
    ]).then(function (answers) {
        // add new Engineer variable
        const engineer = new Engineer(answers.name, parseInt(answers.id), answers.email, answers.github);
        // push to team members list
        teamList.push(engineer);
        console.log(teamList);
        // run addMember function 
        addMember();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id number?"
        },
        {
            type: "input",
            name: "school",
            message: "What school is your intern attending?"
        }
    ]).then(function (answers) {
        // add new intern variable
        const intern = new Intern(answers.name, parseInt(answers.id), answers.email, answers.school);
        // push to team members list
        teamList.push(intern);
        console.log(teamList);
        // run addMember function 
        addMember();
    })
}

// function to add a new member, or choose not to add anymore
function addMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]

        }
    ]).then(function (answer) {
        // if engineer, addEngineer
        if (answer.type === "Engineer") {
            addEngineer();
            // else if intern, add intern
        } else if (answer.type === "Intern") {
            addIntern();
        }
        // otherwise, render the teamList
        else {
            // need to set the render function = to a constant, and then write file of that render
            const renderTeam = render(teamList);
            writeToFile(renderTeam);
        }
    })
}


function writeToFile(data) {
    fs.writeFile("./output/team.html", data, function (err) {
        if (err) {
            throw err;
        }
        console.log('HTML created! Check your output file!');
    })
}

// this function will initiate
addManager();