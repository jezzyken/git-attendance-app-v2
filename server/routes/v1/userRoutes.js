const express = require("express");
const userController = require("../../controllers/userController");
const { auth, authorize } = require("../../middleware/authMiddleware");
const twilio = require('twilio');

const client = twilio(
 "AC93953d1e06354dba08c08291bacd3777",
  "3a3b0f5731833e7b632fbf4b852bf952"
);

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

router.post("/send/sms", async (req, res) => {
  console.log("sending sms")
  const { to = "+639533358870", message = "Send SMS using twilio from server" } = req.body;

  try {
    // Send SMS using Twilio
    const response = await client.messages.create({
      body: message,
      from: "+16033194497",
      to: to
    });

    console.log(response)

    res.json({
      success: true,
      message: 'SMS sent successfully',
      sid: response.sid
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send SMS',
      error: error.message
    });
  }
});




module.exports = router;
