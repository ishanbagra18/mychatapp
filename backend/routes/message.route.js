import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";
// import { deleteConversation } from "../controller/message.controller.js";

const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);
// router.delete("/delete/:id", secureRoute, deleteConversation);


export default router;
