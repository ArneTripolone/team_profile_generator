const Employee = require('./Employee');

class Manager extends Employee {
constructor(officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getofficeNumber() {
    console.log(this.officeNumber);
  }
}

module.exports = Manager;
//Manager.getRole();