import User from "../models/user";
import Product from "../models/product";
import Category from "../models/category";
import Messages from "../constants/messages";
import { validateProductFields as validate } from "../helpers/productHelpers";

export const getAllProducts = async () => {
  const products = await Product.find()
    .populate("category", ["name"])
    .populate("store", ["storeName"]);

  return {
    products
  };
};

export const getSpecificProduct = async productId => {
  const product = await Product.findOne({ _id: productId }).populate(
    "category",
    ["name"]
  );

  if (product) {
    return {
      product: product
    };
  } else {
    throw {
      status: 404,
      message: Messages.productNotFound
    };
  }
};

export const getProductsByCategory = async categoryName => {
  const category = await Category.findOne({ name: categoryName });

  if (category) {
    const products = await Product.find({ category: category._id }).populate(
      "category",
      ["name"]
    );

    return {
      products
    };
  } else {
    throw {
      status: 404,
      message: Messages.assetsNotFound
    };
  }
};

export const getProductByStyle = async styleId => {
  const style = await Style.findById(styleId);

  if (style) {
    const products = await Product.find({ style: style.name }).populate(
      "category",
      ["name"]
    );

    return {
      products
    };
  } else {
    throw {
      status: 404,
      message: Messages.assetsNotFound
    };
  }
};

export const getAllCategories = async () => {
  const categories = await Category.find();

  return {
    categories
  };
};

export const createProduct = async data => {
  const user = await User.findOne({ _id: data.user, role: "Admin" });

  if (user) {
    if (validate(data)) {
      const category = await Category.findOne({
        name: data.category.toLowerCase()
      });
      if (category) {
        data.category = category._id;
        const product = new Product(data);

        await product.save();

        return {
          message: Messages.productCreationSuccess,
          product
        };
      } else {
        const categoryData = {
          name: data.category.toLowerCase()
        };
        const newCategory = new Category(categoryData);

        await newCategory.save();

        data.category = newCategory._id;
        const product = new Product(data);

        await product.save();

        return {
          message: Messages.productCreationSuccess,
          product
        };
      }
    } else {
      throw {
        status: 400,
        messages: Messages.productCreationFail
      };
    }
  } else {
    throw {
      status: 403,
      message: Messages.userNotFound
    };
  }
};

export const updateProduct = async (data, productId) => {
  const user = await User.findById(data.user);

  if (user) {
    const product = await Product.findOne({
      _id: productId
    });

    if (product) {
      const category = await Category.findOne({
        name: data.category
      });

      if (category) {
        Object.assign(product, {
          name: data.name || product.name,
          description: data.description || product.description,
          category: category._id || product.category,
          quantity: data.quantity || product.quantity,
          images: data.images || product.images
        });

        await product.save();

        return {
          product,
          message: Messages.assetUpdated
        };
      } else {
        const newCategory = new Category({ name: data.category });

        await newCategory.save();

        Object.assign(product, {
          name: data.name || product.name,
          description: data.description || product.description,
          category: newCategory._id || product.category,
          quantity: data.quantity || product.quantity,
          images: data.images || product.images
        });

        await product.save();

        return {
          product,
          message: Messages.assetUpdated
        };
      }
    } else {
      throw {
        status: 404,
        message: Messages.productNotFound
      };
    }
  } else {
    throw {
      status: 403,
      message: Messages.userNotFound
    };
  }
};

export const deleteProduct = async (productId, userId) => {
  const user = await User.findById(userId);
  const product = await Product.findOne({
    _id: productId
  });
  if (product) {
    await product.remove();

    return {
      message: Messages.productDeleteSuccess,
      product
    };
  } else {
    throw {
      status: 404,
      message: Messages.productNotFound
    };
  }
};

export const updateProductQty = async productId => {
  const product = await Product.findOne({
    _id: productId
  });

  if (product) {
    if (data.quantity - product.quantity < 0) {
      throw {
        status: 400,
        message: Messages.quantityWrong
      };
    } else {
      Object.assign(product, {
        quantity: data.quantity - product.quantity
      });

      await product.save();

      return {
        product,
        message: Messages.assetUpdated
      };
    }
  } else {
    throw {
      status: 404,
      message: Messages.productNotFound
    };
  }
};
