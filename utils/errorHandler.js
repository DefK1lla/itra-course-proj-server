module.exports = function (res, err) {
   const status = err.status || 500;
   const error = err.error || { message: 'Server error' };

   res.status(status).json(error);
};