//Engineer class is an extension of the Employee class with an additional 'github' property
const Employee = require('./Employee');

class Engineer extends Employee {
constructor(github) {
    super(name, id, email);
    this.github = github;
  }
  getGithub() {
    console.log(this.github);
  }
}

module.exports = Engineer;