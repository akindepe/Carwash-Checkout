const dataBase = require("../util/database");
module.exports = class Managers{
  static getAllActiveEmployee() {
    return dataBase.execute("SELECT * FROM employee WHERE end_date IS NULL ");
  }
  static getAllEmployee() {
    return dataBase.execute("SELECT * FROM employee");
  }
  static findActiveManagerFromUsername(userName) {
    console.log("inside manager");
    return  dataBase.execute(
      "SELECT * FROM employee Where (username = ? AND job_id = ? AND end_date IS NULL)",
      [userName, 1 ,]
    );
  
  }

  static findEmployeeById(employee_id) {
    return dataBase.execute("SELECT * FROM employee Where employee_id= ?", [
      employee_id,
    ]);
  }
};