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

// empty team
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
]).then(function(answers) {
    const manager = new Manager(answers.name, parseInt(answers.id), answers.email, answers.officeNumber)
    teamList.push(manager)
    console.log(teamList);
    addMember();
})
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
]).then(function(answers) {
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
]).then(function(answers) {
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
    ]).then(function(answer) {
        // if engineer, addEngineer
        if(answer.type === "Engineer") {
            addEngineer();
        // else if intern, add intern
        } else if (answer.type === "Intern") {
            addIntern();
        }
        // otherwise, render the teamList
        else {
            render(teamList)
        }
    })
}

addManager();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

