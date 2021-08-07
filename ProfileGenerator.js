const inquirer = require('inquirer');
//const Employee = require('./Employee');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const fs = require('fs');

//let myManager = new Manager('Arne', 182859, 'arnetripolone@gmail.com')

const generateHTML = (answers) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body>
<div class="card" style="width: 18rem;">
  <h3>Name: ${answers.name}
    <br>
  <h3>Occupation: ${answers.occupation}
    <br>  
  <h3>ID: ${answers.id}
    <br>
  <h3>Email: ${answers.email}
    <br>
  <h3>${answers.office_number || answers.school || answers.github}
    <br>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/locale/da.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
</body>
</html>
`
;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'list',
      name: 'occupation',
      message: 'What is your occupation?',
      choices: ["Manager", "Intern", "Engineer"],
    },
//credit to George F for the 'when' property https://stackoverflow.com/questions/61691283/it-is-possible-to-create-branching-questions-with-inquirer
    {
      type: "input",
      name: "github",
      message: "Enter your github username:",
      when: (answers) => {
          if (answers.occupation === "Engineer") {
              return true;
          }
      }
    }, 
    {
      type: "input",
      name: "school",
      message: "Enter your school name:",
      when: (answers) => {
          if (answers.occupation === "Intern") {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "office_number",
      message: "Enter your office number:",
      when: (answers) => {
          if (answers.occupation === "Manager") {
              return true;
          }
      }
    },    
    {
      type: 'input',
      name: 'id',
      message: 'What is your ID?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },        
  ])
  
.then((answers) => {
    const HTMLPageContent = generateHTML(answers);

    fs.appendFile('./dist/teamProfile.html', HTMLPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created teamProfile.html. To add another employee, run node ProfileGenerator again!')
    );
  }
)