const User = require("../models/User");
const { verify } = require("../helpers/token");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    res.status(401).send({ error: "No token provided" });
    return;
  }
  let tokenData;
  try {
    tokenData = verify(req.cookies.token);
  } catch (e) {
    res.status(401).send({ error: "Invalid token" });
    return;
  }
  const user = await User.findOne({ _id: tokenData.id });
  if (!user) {
    res.status(401).send({ error: "Authenticated user not found" });
    return;
  }
  req.user = user;
  next();
};
