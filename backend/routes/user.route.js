// import express from "express";
// import {
//   allUsers,
//   login,
//   logout,
//   signup,
// } from "../controller/user.controller.js";
// import secureRoute from "../middleware/secureRoute.js";
// const router = express.Router();

// // router.post("/signup", upload.single('photo') ,signup);
// router.post("/signup",signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/allusers", secureRoute, allUsers);

// export default router;







import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import multer from "multer";




const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

router.post("/signup", upload.single('profilePic'), signup); // Use multer middleware
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);

export default router;
