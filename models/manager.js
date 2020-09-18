const Employee= require('./employee.js');
module.exports = class Manager extends Employee {
  constructor(id, lastName, jobId) {
    this.id = id;
    this.lastName = lastName;
    this.jobId = jobId;
  }
  getLastName() {
    return this.lastName;
  }
  getEmployeeId() {
    return this.id;
  }
  getJobId() {
    return this.jobId;
  }
};