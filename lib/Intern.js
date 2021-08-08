//Intern class is an extension of the Employee class with an additional 'school' property
const Employee = require('./Employee');

class Intern extends Employee {
constructor(school) {
    super(name, id, email);
    this.school = school;
  }
  getSchool() {
    console.log(this.school);
  }
}

module.exports = Intern;
