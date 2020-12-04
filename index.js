const fs = require("fs");
const inquire = require("inquirer");

inquire.prompt([

    // Basics
    {
        name: "title",
        message: "Name of your repository?"
    },
    {
        name: "githubUsername",
        message: "Your Github username?"
    },
    {
        name: "githubProfileLink",
        message: "Link to your Github profile?"
    },
    {
        name: "email",
        message: "Your email to be reached?"
    },


    // Sections
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
    {
        name: "contribution",
        message: "Enter contribution guidelines if any:"
    },
    {
        name: "tests",
        message: "Enter test instructions if any:"
    }

]).then(answers => {

    let {
        title,
        githubUsername,
        githubProfileLink,
        email,

        description,
        installation,
        usage,
        contribution,
        tests

    } = answers;

    let license = "lic";
    // let license = {
    //     mit: {
    //         badge: "",
    //         notice: ""
    //     }
    // }

    let hasQuestionDetails = (githubUsername || githubProfileLink || email) && (githubUsername.length + githubProfileLink.length + email.length);

    let text = `${ title&&title.length?title + "\n====\n":"" }
${description&&description.length?"Description\n---\n"+description:""}

${installation&&installation.length?"Installation\n---\n"+installation:""}

${usage&&usage.length?"Usage\n---\n"+usage:""}

${license&&license.length?"License\n---\n"+license:""}

${contribution&&contribution.length?"Contribution\n---\n"+contribution:""}

${tests&&tests.length?"Tests\n---\n"+tests:""}

${ hasQuestionDetails?"Questions\n---\n":""}
${ githubUsername&&githubUsername.length?"- What is your Github username?\n - "+githubUsername+"\n":"" }
${ githubProfileLink&&githubProfileLink.length?"- Where can I see more of your repositories?\n - ["+githubProfileLink+"]("+githubProfileLink+")\n":"" }
${ email&&email.length?"- Where can I reach you?\n - You can reach me with additional questions at <a href='mailto:"+email+"'>"+email+"</a>.\n":"" }`;

    // fs.writeFileSync(filename, text);
    console.log(text);

}).catch(err => {
    console.log("Error: ", err);
});