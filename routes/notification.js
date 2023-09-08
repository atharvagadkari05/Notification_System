import Express from "express";
import controllers from "../controllers/notificationControllers.js";
const router = Express.Router();

router.post('/publish', controllers.publishMethod)
router.post('/subscribe', controllers.subscriberMethod)

export default router