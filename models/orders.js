const dataBase = require("../util/database");

module.exports = class Orders {
  static findOrderById(id) {
    return dataBase.execute("SELECT * FROM ticketsold WHERE ticket_id = ?", [
      id,
    ]);
  }
  static deleteOrder(id) {
    return dataBase.execute("DELETE FROM TICKETSOLD WHERE ticket_id = ?", [id]);
  }
  static findTicketStatus(id){
       return dataBase.execute("SELECT ticket_status_id FROM ticketsold WHERE ticket_id = ?", [
         id,
       ]);
  }
  static changePlacedOrderStatus(status, id) {
    return dataBase.execute(
      "UPDATE TICKETSOLD SET ticket_status_id = ? WHERE ticket_id = ?",
      [status, id, ]
    );
  }
  static placeNewOrder(employeeId, serviceId, status, cardId, paymentId) {
    const date = new Date();
    const dateNow = Date.now().toString();
    const orderId = parseInt(
      date.getMinutes().toString() +
        date.getMonth().toString() +
        dateNow.substr(dateNow.length - 6, dateNow.length - 1) +
        date.getSeconds().toString() +
        date.getDate().toString() +
        employeeId.toString() +
        date.getFullYear().toString() +
        date.getHours().toString()
    );

    return dataBase.execute(
      "INSERT INTO TICKETSOLD VALUES(?,?,?,now(),?, ?, ?)",
      [orderId, serviceId, employeeId, status, cardId, paymentId]
    );
  }
};
