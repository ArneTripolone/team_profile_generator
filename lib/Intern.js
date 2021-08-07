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
