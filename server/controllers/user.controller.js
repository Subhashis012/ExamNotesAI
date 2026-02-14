import UserModel from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "Current user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}