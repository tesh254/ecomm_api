import {
  createUser,
  verifyEmail,
  loginUser,
  sendResetEmail,
  handlePasswordReset,
  activateSellerAccount,
  checkAccountActivation
} from "../logic/auth";
import mpesaPaymentMethod from "../helpers/mpesa/pay";
import Messages from "../constants/messages";
import mpesa from "../helpers/mpesa";

export const registerUser = (req, res, next) => {
  const domain = req.protocol + "://" + req.get("host");
  const data = {
    ...req.body,
    domain
  };
  createUser(data)
    .then(response => {
      res.status(201).json({
        message: Messages.registrationSuccess,
        user: response
      });
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const verifyUser = (req, res, next) => {
  const token = req.params.token;
  verifyEmail(token)
    .then(response =>
      res.status(201).json({
        message: Messages.userVerification,
        user: response
      })
    )
    .catch(err => {
      res.status(400).json({ ...err });
    });
};

export const activateAccount = async (req, res, next) => {
  mpesa
    .lipaNaMpesaOnline(
      mpesaPaymentMethod(req.body.amount, req.user.phoneNumber, req.user.id)
    )
    .then(() => {
      res.status(200).json({
        message: Messages.paymentRequest
      });
    })
    .catch(err => {
      res
        .status(400)
        .json({ ...err.data, message: "Something is wrong, try again later" });
    });
};

export const confirmPayment = (req, res, next) => {
  const userID = req.params.id;
  const { stkCallback } = req.body.Body;
  activateSellerAccount(
    userID,
    stkCallback.CallbackMetadata ? stkCallback.CallbackMetadata : null
  )
    .then(Res => res.status(201).json({ ...Res }))
    .catch(err => {
      res.status(400).json({
        ...err
      });
    });
};

export const accountActivationCheck = (req, res, next) => {
  checkAccountActivation(req.user._id)
    .then(Res => {
      res.status(200).json({ ...Res });
    })
    .catch(err => {
      res.status(err.status).json({ ...err });
    });
};

export const login = (req, res, next) => {
  loginUser(req.body)
    .then(response => {
      res.status(200).json({ ...response });
    })
    .catch(err => {
      res.status(err.status).json({ ...err });
    });
};

export const passwordReset = (req, res, next) => {
  sendResetEmail(req.body)
    .then(Res => res.status(200).json({ ...Res }))
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const updatePassword = (req, res, next) => {
  const data = {
    token: req.params.token,
    ...req.body
  };
  handlePasswordReset(data)
    .then(Res => res.status(201).json({ ...Res }))
    .catch(err => {
      res.status(err.status).json(err);
    });
};
