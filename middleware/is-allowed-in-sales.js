

exports.salesPortalAuth = (req, res, next) => {
  if (!req.session.isLoggedin) {
    
    return res.redirect("/login");
  }
  
  next();
};
