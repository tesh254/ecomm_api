import express from "express";

import Routes from "../constants/routes";
import {
  profileCreation,
  editProfile,
  getUser,
  getUserByEmail
} from "../middlewares/profile";
import routeProtector from "../middlewares/routeProtection";

const api = express.Router();

api.post(Routes.api.profile.create, routeProtector, profileCreation);

api.get(Routes.api.profile.by_email, routeProtector, getUserByEmail);

api.put(Routes.api.profile.update, routeProtector, editProfile);

api.get(Routes.api.profile.get, getUser);

export default api;
