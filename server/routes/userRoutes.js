import express from "express";
import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getAllUsersAdmin,
  getUser,
  updateMe,
  uploadUserPhoto,
} from "../controllers/userController.js";
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signup,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);

router.put("/updateMyPassword", protect, changePassword);
router.put("/updateMe", protect, uploadUserPhoto, updateMe);
router.delete("/deleteMe", protect, deleteMe);

router.get("/all-users", getAllUsersAdmin);
router.delete("/delete-user/:id", protect, deleteUser);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;
