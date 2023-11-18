const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const predefinedCredentials = {
    userId: "predefinedUserId",
    name: "Predefined Admin",
    email: "admin@codesfortomorrow.com",
};

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, "Secret");

        req.user = predefinedCredentials;

        next();
    } catch (error) {
        throw new UnauthenticatedError("Error Authentication invalid");
    }
};

module.exports = { authenticateToken };
