const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authenticated, hasRole([ROLES.ADMIN]), addProduct);
router.patch("/:id", authenticated, hasRole([ROLES.ADMIN]), editProduct);
router.delete("/:id", authenticated, hasRole([ROLES.ADMIN]), deleteProduct);

module.exports = router;
