import { Router } from "express";
import { getChannelStats } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/stats/user/:userId").get(verifyJWT, getChannelStats);

export default router;