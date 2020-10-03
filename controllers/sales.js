const Services = require("../models/services");
const Orders = require("../models/orders");
var [services] = [];
let employeeId;
exports.getSalesportal = async (req, res, next) => {
  employeeId = req.session.user.employee_id;
  try {
    [services] = await Services.getAllServices();

    return res.status(200).render("salesportal/salesportal", {
      path: "/",
      pageTitle: "Sales Portal",
      services: services,
      cashierName: req.session.user.last_name,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.cancelOrder = async (req, res, next) => {
  let cancelledOrderId = 2;
  const OrderNumber = req.params.orderNr;

  try {
    const [foundTicket] = await Orders.findOrderById(OrderNumber);
    if (foundTicket.length < 1) {
      return res.status(422).json({ valid: false, message: "invalid Ticket" });
    }
    const ticketStatus = await Orders.findTicketStatus(OrderNumber);
    if (foundTicket[0].ticket_status_id === cancelledOrderId) {
      return res
        .status(422)
        .json({ valid: false, message: "Ticket aleady cancelled" });
    }
    //await Orders.deleteOrder(foundTicket[0].ticket_id);
    await Orders.changePlacedOrderStatus(
      cancelledOrderId,
      foundTicket[0].ticket_id
    );
    console.log("cancelled");
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.log("deleting catch here");
  }
};
exports.cashPayment = async (req, res, next) => {
  const currentServices = [];
  try {
    const paidServices = await req.body;
    console.log(services);
    services.forEach((service) => {
      currentServices.push(service.service_name);
    });
    var i;
    for (i = 0; i < paidServices.length; i++) {
      if (!currentServices.includes(paidServices[i].name)) {
        console.log("it doesnt av it");
        return res.status(422).json({ message: false });
      }
    }
    for (let requests of paidServices) {
      let [Id] = await Services.getServiceId(requests.name);
      console.log(Id[0].service_id);
      await Orders.placeNewOrder(employeeId, Id[0].service_id, 1, null, 1);
      console.log("order placed");
    }
    return res.status(200).json({ message: true });
  } catch (error) {
    console.log(error);
  }
};
