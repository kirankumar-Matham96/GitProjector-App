export const handleError = (err, req, res, next) => {
  if (err) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }

  next();
};
