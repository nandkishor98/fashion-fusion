const { verifyJWT } = require("./jwt");

const compareRole = (requiredRole, userRole) => {
  if (requiredRole.length < 1) return true;
  return userRole.some((v) => requiredRole.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  return (req, res, next) => {
    const token = req?.headers?.authorization;
    if (!token) throw new Error("Access Token Required");
    const accessToken = token.split("Bearer ")[1];
    const { data } = verifyJWT(accessToken);
    const { roles: userRole, email } = data;
    // check if the user has required role or not
    // compare role against secureAPI passed role
    const isValidRole = compareRole(roles ?? [], userRole);
    if (!isValidRole) throw new Error("User unauthorized");
    next();
  };
};

module.exports = secureAPI;