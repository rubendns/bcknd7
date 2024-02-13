import { Router } from "express";
import userModel from '../dao/models/user.model.js';
import {authToken} from '../utils.js';

const router = Router();

router.get("/:userId", authToken,
async (req, res) =>{
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(202).json({message: "User not found with ID: " + userId});
        }
        res.json(user);
    } catch (error) {
        console.error("Error querying user with ID: " + userId);
    }
});

export default router;