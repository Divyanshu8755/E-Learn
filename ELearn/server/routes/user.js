import express from "express"
import { VerifyUser, loginUser, myProfile, register } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";
const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", VerifyUser);
router.post("/user/login", loginUser);
router.get("/user/me",isAuth,myProfile);

export default router;
