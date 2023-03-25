export const errorHandle = (err, req, res, next) => {
  const status = err.status || 500;
  const massage = err.massage || "Somthing went wrong!";
  return res.status(status).json({
    succsess: false,
    status,
    massage,
  });
};
