const dataBase = require("../util/database");

module.exports = class Users {
  static getAllActiveEmployee() {
    return dataBase.execute("SELECT * FROM employee WHERE end_date IS NULL ");
  }
  static getAllEmployee() {
    return dataBase.execute("SELECT * FROM employee");
  }
  static findActiveUserFromUsername(userName){
     return dataBase.execute(
       "SELECT * FROM employee Where username = ? AND end_date IS NULL",
       [userName]
     );
  }

  static findEmployeeById(employee_id) {
    return dataBase.execute("SELECT * FROM employee Where employee_id= ?", [
      employee_id,
    ]);
  }
};
