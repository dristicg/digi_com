
const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { userId, address, city, pincode, phone } = req.body;
  
  if (!userId || !address || !city || !pincode || !phone) {
    return res.status(400).json({ success: false, message: "Invalid data provided!" });
  }

  // Continue with database logic...
});
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

module.exports = router;