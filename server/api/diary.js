//user's movie diary
const router = require("express").Router();

const { models: { Order } } = require("../db");
const OrderItem = require("../db/models/OrderItem");
const Product = require("../db/models/Product");
const User = require("../db/models/User");
const { isLoggedIn } = require("../middleware");

//Stripe payment
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user;

        const orders = await Order.findAll({
            include: {
                model: OrderItem,
                include: {
                    model: Product
                }
            },
            where: {
                userId: user.id
            },
            order: [["updatedAt", "DESC"]],
        });
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
});

router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const domainURL = process.env.SERVER_URL;
        const { orderId } = req.body
        // console.log(orderId)

        const orderCheckout = await Order.findByPk(orderId, {
            include: {
                model: OrderItem,
                include: {
                    model: Product
                }
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            client_reference_id: orderId,
            shipping_address_collection: {
                allowed_countries: ["US"]
            },
            line_items: orderCheckout.orderitems.map(({ product, quantity }) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            images: [product.imageURL],
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: quantity,
                }
            }),
            success_url: `${domainURL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/checkout`,
        })
        res.json(session.url);
    }
    catch (err) {
        next(err);
    }
});

router.put("/", isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user
        const { orderId, shippingName, shippingAddress } = req.body
        const order = await Order.findByPk(orderId);

        if (order.isCart === false) {
            const cart = await Order.findOne({
                where: {
                    userId: user.id,
                    isCart: true
                },
                include: {
                    model: OrderItem
                }
            })
            res.json(cart)
        }
        else {
            ////// close successful order cart /////////
            await order.update({ isCart: false, shippingAddress: shippingAddress, shippingName: shippingName })

            /////// Generate new order cart //////////////
            let newOrderCart = await Order.create({ userId: user.id })

            newOrderCart = await Order.findByPk(newOrderCart.id, {
                include: {
                    model: OrderItem
                }
            })
            res.json(newDiary);
        }

    }
    catch (err) {
        next(err);
    }
});

module.exports = router;