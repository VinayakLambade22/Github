const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/auth.middleware");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.put("/updateProfile/:id", protect, userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", protect, userController.deleteUserProfile);

module.exports = userRouter;