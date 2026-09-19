import express from "express";
import {
  addProducts,
  deleteProduct,
  getProducts,
  updatedProduct,
} from "../controller/product.controller";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProducts);
router.put("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

export default router;
