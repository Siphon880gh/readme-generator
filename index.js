const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([

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

]).then(answers => {

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

    let hasQuestionDetails = (githubUsername || githubProfileLink || email) && (githubUsername.length + githubProfileLink.length + email.length);

    let text = `${ title&&title.length?title + "\n====\n":"" }
${license&&license.length?licenser.getBadge(license)+"\n":""}
${description&&description.length?"Description\n---\n"+description:""}

__TOC__

${installation&&installation.length?"Installation\n---\n"+installation:""}

${usage&&usage.length?"Usage\n---\n"+usage:""}

${license&&license.length?"License\n---\n"+licenser.getText(license):""}

${contribution&&contribution.length?"Contribution\n---\n"+contribution:""}

${tests&&tests.length?"Tests\n---\n"+tests:""}

${ hasQuestionDetails?"Questions\n---\n":""}
${ githubUsername&&githubUsername.length?"- What is your Github username?\n - "+githubUsername+"\n":"" }
${ githubProfileLink&&githubProfileLink.length?"- Where can I see more of your repositories?\n - ["+githubProfileLink+"]("+githubProfileLink+")\n":"" }
${ email&&email.length?"- Where can I reach you?\n - You can reach me with additional questions at <a href='mailto:"+email+"'>"+email+"</a>.\n":"" }`;

    // text = text.replace(/\n\n/gm, "\n");
    text = text.replace(/\n\n\n/gm, "\n");

    text = addTableOfContents(text, description, installation, usage, license, contribution, tests, hasQuestionDetails);

    // fs.writeFileSync(filename, text);
    console.log(text);

}).catch(err => {
    console.log("Error: ", err);
});

function addTableOfContents(text, description, installation, usage, license, contribution, tests, hasQuestionDetails) {
    let toc = "";

    if (description && description.length)
        toc += "- [Description](#description)\n";
    if (installation && installation.length)
        toc += "- [Installation](#installation)\n";
    if (usage && usage.length)
        toc += "- [Usage](#usage)\n";
    if (license && license.length)
        toc += "- [License](#license)\n";
    if (contribution && contribution.length)
        toc += "- [Contribution](#contribution)\n";
    if (tests && tests.length)
        toc += "- [Tests](#tests)\n";
    if (hasQuestionDetails)
        toc += "- [Questions](#questions)\n";

    if (toc.length) toc = "Table of Contents\n---\n" + toc;
    text = text.replace(/__TOC__/, toc);

    return text;
}

/**
 * @object licenser
 * @method getText Returns license link
 * @method getBadge Returns badge image
 * @description
 * License links are from https://github.com/github/choosealicense.com/tree/gh-pages/_licenses
 * License badges are from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
 * 
 */
let licenser = {

    getText: (license) => {
        switch (license) {
            case "apache2":
                return "[Apache 2.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/apache-2.0.txt)";
                break;
            case "bsd2":
                return "[BSD2](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-2-clause.txt)";
                break;
            case "bsd3":
                return "[BSD3](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-3-clause.txt)";
                break;

                // --

            case "cc1":
                return "[CC 1.0 License](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc0-1.0.txt)";
                break;
            case "cc4-international":
                return "[CC 4.0 International](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc-by-4.0.txt)";
                break;
            case "cc4-sharealike":
                return "[CC 4.0 Share Alike](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc-by-4.0.txt)";
                break;

                // --

            case "EPL1":
                return "[ELP 1.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/epl-1.0.txt)";
                break;
            case "GNU GPLv2":
                return "[GNU General Public License v2.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/gpl-2.0.txt)";
                break;
            case "GNU GPLv3":
                return "[GNU General Public License v3.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/gpl-3.0.txt)";
                break;

                // --

            case "MIT":
                return "[MIT License](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit.txt)";
                break;
            case "Unlicense":
                return "[Unlicense](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/unlicense.txt)";
                break;

            default:
                return "error-license-badge-not-found";
        }
    },
    getBadge: (license) => {
        switch (license) {
            case "apache2":
                return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
                break;
            case "bsd2":
                return "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
                break;
            case "bsd3":
                return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
                break;

                // --

            case "cc1":
                return "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
                break;
            case "cc4-international":
                return "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
                break;
            case "cc4-sharealike":
                return "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)";
                break;

                // --

            case "EPL1":
                return "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
                break;
            case "GNU GPLv2":
                return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
                break;
            case "GNU GPLv3":
                return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
                break;

                // --

            case "MIT":
                return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                break;
            case "Unlicense":
                return "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
                break;

            default:
                return "error-license-badge-not-found";
        }
    }
}