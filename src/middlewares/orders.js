import {
  getAllOrders,
  getOrdersAccordingToUser,
  getSingleOrder,
  adminDeleteOrder,
  userDeleteOrder
} from "../logic/orders";

export const fetchOrders = (req, res) => {
  getAllOrders().then(Res => {
    res.status(200).json(Res);
  });
};

export const fetchOwnOrders = (req, res) => {
  getOrdersAccordingToUser(req.user._id).then(Res => {
    res.status(200).json(Res);
  });
};

export const fetchSingleOrder = (req, res) => {
  getSingleOrder(req.params.order_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const checkout = (req, res) => {
  checkout(req.body, req.user._id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const adminRemoveOrder = (req, res) => {
  adminDeleteOrder(req.user._id, req.params.order_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const userArchiveOrder = (req, res) => {
  userDeleteOrder(req.user._id, req.params.order_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};
