import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js"

import {
    userLogin,
    logoutUser
} from "../controllers/user.controller.js"


const router = Router()


// routes
router.route('/login')
    .post(userLogin)

router.route('/logout')
    .get(logoutUser)



export default router;