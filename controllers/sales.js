

exports.getSalesportal =(req,res, next) =>{
   
       res.status(200).render("salesportal/salesportal", {
          path: "/",
          pageTitle: "Sales Portal",
          cashierName: row[0].last_name,
          id: row[0].employee_id,
        });
   
}