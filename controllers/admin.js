
const Services = require("../models/services");
exports.getAdminHomePage = async (req,res, next) =>{
    const mainService = [];
    const extraService = [];
    try {
        [services] = await Services.getAllServices();
        services.forEach((service) => {
            if (service.service_type_id === 1){
                mainService.push(service.service_name);
            }
              else{
                 extraService.push(service.service_name); 
              }
        });
          return res.status(200).render("admin/adminSales", {
            //path: "/sales",
            pageTitle: "Umsätze",
            mainServices: mainService,
            extraService: extraService,
            adminName: req.session.user.last_name,
          });
    } catch (err) {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
    }

};
