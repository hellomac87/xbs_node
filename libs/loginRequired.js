module.exports = function(req, res, next){
  if(!req.isAuthenticated()){
      res.redirect('/xbs_admin');
  } else{
      return next()
  }
};