/**
 * @file index.js
 * Node script
 * @require File System module
 * @require inquirer - commond line user interface so you can ask user questions and accept their inputs 
 * 
 */
const fs = require("fs");
const inquirer = require("inquirer");
const { ifAnsweredThenAddText, addTableofContents, ifAnsweredBasicsThenAddText, getLicenseText, getLicenseBadge } = require("./helpers/helpers.js");

// Questions to ask the README generator user
const questions = [

    // Basic Questions
    {
        name: "title",
        message: "Name of your repository?"
    },
    {
        name: "githubUsername",
        message: "Your Github username?"
    },
    {
        name: "email",
        message: "Your email to be reached?"
    },


    // ReadMe Sections
    {
        name: "description",
        message: "Enter a description if any:"
    },
    {
        name: "installation",
        message: "Enter installation instructions if any:"
    },
    {
        name: "usage",
        message: "Enter usage information if any:"
    },

    // License question
    // Is in multiple choice format
    {
        name: "license",
        choices: [
            new inquirer.Separator(),
            "apache2", "bsd2", "bsd3",
            new inquirer.Separator(),
            "cc1", "cc4-international", "cc4-sharealike",
            new inquirer.Separator(),
            "EPL1", "GNU GPLv2", "GNU GPLv3",
            new inquirer.Separator(),
            "MIT", "Unlicense"
        ],
        type: 'list'
    },
    {
        name: "contribution",
        message: "Enter contribution guidelines if any:"
    },
    {
        name: "tests",
        message: "Enter test instructions if any:"
    }
];

// Will have the answers
global.answers = {};

/**
 * 
 * @callback
 * Handles the answers after user responds to questions
 * The result is a generated read me file called "Generated-README.md"
 *  
 */
const generateReadMe = answers => {

    // Make answers accessible at the global scope so that helper functions can concatenate to the ReadMe text
    global.answers = answers;

    // Make answers accessible at this level
    let {
        title,
        githubUsername,
        githubProfileLink,
        email,

        description,
        installation,
        usage,
        license,
        contribution,
        tests

    } = answers;

    // Concatenate ReadMe text based on answers or lack of
    let text = "";
    text += ifAnsweredThenAddText(title, title + "\n====\n");
    text += ifAnsweredThenAddText(license, getLicenseBadge(license) + "\n\n");
    text += ifAnsweredThenAddText(description, "Description\n---\n" + description + "\n\n");
    text += addTableofContents();
    text += ifAnsweredThenAddText(installation, "Installation\n---\n" + installation + "\n\n");
    text += ifAnsweredThenAddText(usage, "Usage\n---\n" + usage + "\n\n");
    text += ifAnsweredThenAddText(license, "License\n---\n" + getLicenseText(license) + "\n\n");
    text += ifAnsweredThenAddText(contribution, "Contribution\n---\n" + contribution + "\n\n");
    text += ifAnsweredThenAddText(tests, "Tests\n---\n" + tests + "\n\n");
    text += ifAnsweredBasicsThenAddText();

    // Replace multiple blank lines in generated ReadMe text from skipped questions
    // text = text.replace(/\n\n\n/gm, "\n");

    // Generate ReadMe file
    const filename = "Generated-README.md";
    fs.writeFileSync(filename, text);

    // Show ReadMe text generated in Node JS output
    console.group("README Generator");
    console.log(`Written to ${filename}:\n${text}`);
    console.groupEnd();

};

const catchError = err => {
    console.log("Error: ", err);
}

// Use Inquirer API that takes your questions, a callback to handle the questions, and a callback to handle errors
inquirer
    .prompt(questions)
    .then(generateReadMe)
    .catch(catchError);