const {models: {User}} = require('./db');

//////////////////  MIDDLEWARES   ///////////////////////
const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next(); 
  } catch (ex) {
    next(ex);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  const error = new Error("must be Admin!");
  error.status = 401;
  next(error);
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
