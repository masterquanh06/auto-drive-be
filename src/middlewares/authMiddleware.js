import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_ACCESS_KEY) {
        return res.status(500).json({ message: "Server configuration error" });
    }
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            console.log("Sai:", err);
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: "Token has expired" });
            }
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    });
};
export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};