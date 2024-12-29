const express = require("express");
const userController = require("../../controllers/userController");
const { auth, authorize } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/", userController.createUser);

router.use(auth);

router.route("/").get(userController.getUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authorize("admin"), userController.deleteUser);

router.patch(
  "/:id/toggle-status",
  auth,
  authorize("admin"),
  userController.toggleUserStatus
);

module.exports = router;
