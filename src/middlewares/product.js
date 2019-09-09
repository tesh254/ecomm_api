import {
  getAllProducts,
  getSpecificProduct,
  getProductsByCategory,
  getAllCategories,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductQty
} from "../logic/products";

export const fetchProducts = (req, res, next) => {
  getAllProducts().then(Response => {
    res.status(200).json({ ...Response });
  });
};

export const fetchSpecificProduct = (req, res, next) => {
  getSpecificProduct(req.params.product_id)
    .then(Response => {
      res.status(200).json({ ...Response });
    })
    .catch(err => {
      res.status(err.status).json({ ...err });
    });
};

export const fetchProductsByCategory = (req, res, next) => {
  getProductsByCategory(req.params.category_name)
    .then(Response => {
      res.status(200).json(Response);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const fetchAllCategories = (req, res, next) => {
  getAllCategories()
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      next(err);
      res.status(err.status).json(err);
    });
};

export const addProduct = (req, res, next) => {
  const data = {
    ...req.body,
    user: req.user._id
  };

  createProduct(data)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      next(err)
      res.status(err.status).json(err);
    });
};

export const removeProduct = (req, res, next) => {
  deleteProduct(req.params.product_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};

export const editProdudct = (req, res, next) => {
  const data = {
    user: req.user._id,
    ...req.body
  };
  updateProduct(data, req.params.product_id)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      next(err)
      res.status(err.status).json(err);
    });
};

export const updateQuantity = (req, res, next) => {
  const data = {
    user: req.user._id,
    ...req.body
  };
  updateProductQty(data, req.params.product_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
};
