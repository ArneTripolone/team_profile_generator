//Manager class is an extension of the Employee class with an additional 'officeNumber' property
const Employee = require('./Employee');

class Manager extends Employee {
constructor(officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    console.log(this.officeNumber);
  }
}

module.exports = Manager;