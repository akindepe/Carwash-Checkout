const Employee = require("./employee.js");
module.exports = class Attendant extends Employee {
  constructor(id, lastName) {
    this.id = id;
    this.lastName = lastName;
  }
  getLastName() {
    return this.lastName;
  }
  getEmployeeId() {
    return this.id;
  }
  getJobId(){
    
  }
};
