import express from "express";
import Routes from "../constants/routes";
import {
  registerUser,
  verifyUser,
  activateAccount,
  login,
  passwordReset,
  updatePassword,
  confirmPayment,
  accountActivationCheck
} from "../middlewares/auth";
import routeProtector from "../middlewares/routeProtection";

const api = express.Router();

api.post(Routes.api.auth.signin, login);

api.post(Routes.api.auth.signup, registerUser);

api.put(Routes.api.auth.verify, verifyUser);

api.post(Routes.api.auth.password_reset_email_endpoint, passwordReset);

api.put(Routes.api.auth.password_reset, updatePassword);

api.put(Routes.api.auth.activate, routeProtector, activateAccount);

api.post(Routes.api.auth.confirm, confirmPayment);

api.get(Routes.api.auth.checker, routeProtector, accountActivationCheck);

export default api;
