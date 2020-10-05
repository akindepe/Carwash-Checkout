
const dataBase = require("../util/database");


module.exports = class Services {
  constructor(service_id, service_name, service_price, service_type_id) {
    this.service_id = service_id;
    this.service_name = service_name;
    this.service_price = service_price;
    this.service_type_id = service_type_id;
  }

  static getAllServices() {
    return dataBase.execute("SELECT * FROM service");
  }

  static getServiceId(serviceName) {
    return dataBase.execute(
      "SELECT service_id FROM service WHERE service_name = ?",
      [serviceName]
    );
  }
  static insertIntoOrders(serviceName, employeeId) {
    return dataBase.execute(
      "SELECT service_id FROM service WHERE service_name = ?",
      [serviceName]
    );
  }
};
