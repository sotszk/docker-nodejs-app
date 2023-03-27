export const logger = (req, _res, next) => {
  console.info(new Date().toISOString(), `INFO: ${req.method} ${req.url}`);
  next();
};
