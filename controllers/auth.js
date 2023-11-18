const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const predefinedCredentials = {
    email: "admin@codesfortomorrow.com",
    password: "Admin123!@#",
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (email !== predefinedCredentials.email || password !== predefinedCredentials.password) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = jwt.sign(
        { userId: "predefinedUserId", name: "Predefined Admin", email: email },
        "Secret",
        { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({ user: { name: "Predefined Admin", email: email }, token });
};

module.exports = { login };
