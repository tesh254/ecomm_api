import express from "express";
import Routes from "../constants/routes";
import {
  fetchProducts,
  fetchSpecificProduct,
  fetchProductsByCategory,
  fetchAllCategories,
  addProduct,
  removeProduct,
  editProdudct,
  updateQuantity
} from "../middlewares/product";
import routeProtector from "../middlewares/routeProtection";

const api = express.Router();

api.get(Routes.api.product.all, fetchProducts);

api.get(Routes.api.product.single, fetchSpecificProduct);

api.get(Routes.api.product.by_category, fetchProductsByCategory);

api.get(Routes.api.product.all_categories, fetchAllCategories);

api.post(Routes.api.product.all, routeProtector, addProduct);

api.delete(Routes.api.product.single, routeProtector, removeProduct);

api.put(Routes.api.product.single, routeProtector, editProdudct);

api.put(Routes.api.product.single, routeProtector, updateQuantity);

export default api;
