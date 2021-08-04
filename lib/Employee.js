class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    console.log(`Name: ${this.name}`);
  }
  getId() {
    console.log(`Id: ${this.id}`);
  }
  getEmail() {
    console.log(`Email: ${this.email}`);
  }
}

//`getRole()`&mdash;returns `'Employee'`

module.exports = Employee;
Employee.getRole()
//not entirely sure about this, see if it works