module.exports = (roles = []) => (req, res, next) => {
      console.log("Session user:", req.session.user); // 👈 see what comes in

  if (!req.session.user) return res.status(401).json({ msg: "Unauthorized" });
  if (roles.length && !roles.includes(req.session.user.role)) {
    return res.status(403).json({ msg: "Forbidden" });
  }
  next();
};
