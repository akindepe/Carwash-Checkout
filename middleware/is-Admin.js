exports.isAdmin = (req, res, next) => {
  if (!(req.session.isLoggedin && req.session.adminMode)) {
    return res.redirect("/admin/login");
  }
  next();
};
