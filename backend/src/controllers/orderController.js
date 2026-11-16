import User from "../models/User.js";
import Orders from "../models/Order.js";
import servicesData from "../data/services.js";

export const createOrder = async (req, res) => {
    const id = req.user.userId;
    const { services, address, phone } = req.body;

    if (!Array.isArray(services) || services.length === 0) {
        return res.status(400).json({ message: "Plase select at least one service" });
    }

    if (!address?.trim() || !phone?.trim()) {
        return res.status(400).json({
            message: "Address and phone are required!"
        });
    }

    try {
        const selectedServices = services.map((service) => {
            const selectedService = servicesData.find(
                (item) => item.name === service.serviceName
            );
            if (!selectedService) {
                return null;
            }

            return {
                serviceName: selectedService.name,
                servicePrice: selectedService.price,
            }
        });

        if (selectedServices.includes(null)) {
            return res.status(400).json({ message: "One or more selected services are invalid!" });
        }

        const total = selectedServices.reduce(
            (sum, service) => sum + service.servicePrice,
            0
        );


        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({ message: "No user found!" })
        }

        const order = await Orders.create({
            user: user._id,
            services: selectedServices,
            total,
            name: user.name,
            email: user.email,
            address,
            phone
        });

        res.status(201).json({ message: "Orders created successfully!", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const getOrders = async (req, res) => {
    const id = req.user.userId;

    try {
        const orders = await Orders.find({ user: id });

        if (orders.length === 0) {
            return res.status(400).json({
                message: "No orders found!",
                orders: []
            });
        }

        res.status(200).json({ message: "Orders fetched successfully!", orders: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to load orders!" })
    }
}

export const getOrderById = async (req, res) => {
    const currentUserId = req.user.userId;
    const { id } = req.params;

    try {
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "No order found!",
                order: []
            });
        }

        if (order.user.equals(currentUserId)) {
            res.status(200).json({ message: "Order fetched successfully!", order: order });
        } else {
            res.status(403).json({ message: "Invalid user!" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to fetch order!" })
    }
}

export const cancelOrder = async (req, res) => {
    const currentUserId = req.user.userId;
    const { id } = req.params;

    try {
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: "No order found!" });
        }

        if (!order.user.equals(currentUserId)) {
            return res.status(404).json({ message: "No order found!" });
        }

        if(order.status === 'Completed' || order.status === 'Cancelled') {
            return res.status(400).json({message: `Order cannot be cancelled because its status is ${order.status}!`});
        }
        
        order.status = 'Cancelled';
        await order.save();

        res.status(200).json({message: 'Order cancelled!', order: order});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}