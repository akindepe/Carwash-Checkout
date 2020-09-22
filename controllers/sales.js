const Services = require("../models/services");

exports.getSalesportal = async (req, res, next) => {
  try {
    const [services] = await Services.getAllServices();
    console.log(services);

    return res.status(200).render("salesportal/salesportal", {
      path: "/",
      pageTitle: "Sales Portal",
      services: services,
      //cashierName: row[0].last_name,
      // id: row[0].employee_id,
    });
  } catch (error) {
    console.log(error);
  }
};
