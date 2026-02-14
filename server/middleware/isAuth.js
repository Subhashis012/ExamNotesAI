import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default isAuth;