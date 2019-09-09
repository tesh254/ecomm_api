import User from "../models/user";
import Order from "../models/order";
import Messages from "../constants/messages";
import { updateProductQty } from "./products";

export const getAllOrders = async () => {
    const orders = await Order.find();

    return {
        orders
    }
}

export const getOrdersAccordingToUser = async (userId) => {
    const orders = await Order.find({user: userId, isActive: true})

    return {
        orders
    }
}

export const getSingleOrder = async (orderId) => {
    const order = await Order.findById(orderId)

    if (order) {
        return {
            order
        }
    }
    else {
        throw {
            status: 404,
            message: Messages.assetsNotFound
        }
    }
}

export const createOrder = async (data, userId) => {
    const user = await User.findOne({ _id: userId, role: "User"});

    if (user) {
        data.cart.map(async product => {
            await updateProductQty(product.product_id);
        });
        data.user = user._id
        const order = new Order(data);

        await order.save();

        return {
            order
        }
    }
    else {
        throw {
            status: 404,
            message: Messages.userNotFound
        }
    }
}

export const adminDeleteOrder = async (userId, orderId) => {
    const user = await User.findOne({ _id: userId, role: "Admin"})

    if (user) {
        const order = await Order.findById(orderId)

        await order.remove()

        await order.save()

        return {
            order
        }
    }
    else {
        throw {
            status: 403,
            message: Messages.unathorizedUser
        }
    }
}

export const userDeleteOrder = async (userId, orderId) => {
    const order = await Order.findOne({ _id: orderId, user: userId});

    if (order) {
        order.isActive = false;

        await order.save()

        return { 
            order
        }
    }
    else {
        throw {
            status: 403,
            message: Messages.unathorizedUser
        }
    }
}
