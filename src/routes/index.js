import  express  from "express";
import IndexController from "../controllers/index.js"
import UserRoutes from "./users.js"

const router = express.Router();

//Homepage routes
router.get('/',IndexController.homepage)

//other routes attached homepage
router.use('/user', UserRoutes)

export default router