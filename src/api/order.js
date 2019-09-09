import express from "express";
import {
  fetchOrders,
  fetchOwnOrders,
  fetchSingleOrder,
  checkout,
  adminRemoveOrder,
  userArchiveOrder
} from "../middlewares/orders";
import Routes from "../constants/routes";
import routeProtector from "../middlewares/routeProtection";

const api = express.Router();

// Fetch all orders
api.get(Routes.api.order.all, routeProtector, fetchOrders);

// Fetch user's own order
api.get(Routes.api.order.user_orders, routeProtector, fetchOwnOrders);

// Fetch a single order
api.get(Routes.api.order.single, routeProtector, fetchSingleOrder);

// Save an order after checkout
api.post(Routes.api.order.checkout, routeProtector, checkout);

// Admin delete single order
api.delete(Routes.api.order.single, routeProtector, adminRemoveOrder);

// User archieve own order
api.delete(Routes.api.order.single, routeProtector, userArchiveOrder);

export default api;
