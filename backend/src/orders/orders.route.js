// const express = require("express");
// const Order = require("./orders.model");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { sendNotification } = require("../middleware/notification.middleware");
// const verifyRole = require("../middleware/verifyRole"); // Ensure this path is correct

// // Create Checkout Session (for buyers)
// router.post(
//   "/create-checkout-session",
//   verifyRole("buyer"),
//   async (req, res) => {
//     const { products } = req.body;

//     try {
//       const lineItems = products.map((product) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//             images: [product.image],
//           },
//           unit_amount: Math.round(product.price * 100),
//         },
//         quantity: product.quantity,
//       }));

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         success_url:
//           "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
//         cancel_url: "http://localhost:5173/cancel",
//       });

//       res.json({ id: session.id });
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       res.status(500).json({ error: "Failed to create checkout session" });
//     }
//   }
// );
// // Fetch all orders for a specific seller
// // Fetch all orders for the logged-in seller
// router.get("/my-orders", verifyRole("seller"), async (req, res) => {
//   const sellerId = req.user.id; // Assume req.user contains the logged-in user's info

//   try {
//     const orders = await Order.find({ sellerId }).sort({ createdAt: -1 });
//     if (!orders.length)
//       return res
//         .status(404)
//         .json({ message: "No orders found for this seller" });
//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching seller orders:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Confirm Payment
// router.post("/confirm-payment", async (req, res) => {
//   const { session_id } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(session_id, {
//       expand: ["line_items", "payment_intent"],
//     });
//     const paymentIntentId = session.payment_intent.id;

//     let order = await Order.findOne({ orderId: paymentIntentId });

//     if (!order) {
//       const lineItems = session.line_items.data.map((item) => ({
//         productId: item.price.product,
//         quantity: item.quantity,
//       }));
//       const amount = session.amount_total / 100;

//       order = new Order({
//         orderId: paymentIntentId,
//         products: lineItems,
//         amount,
//         email: session.customer_details.email,
//         status: "pending",
//       });

//       // Save the order first
//       await order.save();

//       // Prepare the notification data
//       req.body = {
//         notificationType: "orderStatusChange", // or any other type you define
//         userEmail: session.customer_details.email,
//         message: "Your order has been placed successfully and is now pending.",
//       };

//       // Now call the notification middleware manually
//       await notificationMiddleware(req, res, () => {});
//     }

//     res.json({ order });
//   } catch (error) {
//     console.error("Error confirming payment:", error);
//     res.status(500).json({ error: "Failed to confirm payment" });
//   }
// });

// // Fetch orders for specific user role
// router.get("/:email", verifyRole("buyer"), async (req, res) => {
//   const { email } = req.params;
//   try {
//     const orders = await Order.find({ email }).sort({ createdAt: -1 });
//     if (!orders.length)
//       return res.status(404).json({ message: "No orders found" });
//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update Order Status (Seller only)
// router.patch(
//   "/update-order-status/:id",
//   verifyRole("seller"),
//   async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     try {
//       const order = await Order.findById(id);
//       if (!order) return res.status(404).json({ message: "Order not found" });

//       order.status = status;
//       order.orderUpdates.push({ status });
//       await order.save();

//       await sendNotification(
//         order.email,
//         `Your order status has been updated to: ${status}`
//       );
//       res.json({ message: "Order status updated", order });
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// // Delete Order (Admin only)
// router.delete("/delete-order/:id", verifyRole("admin"), async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder)
//       return res.status(404).json({ message: "Order not found" });

//     res.json({ message: "Order deleted successfully", order: deletedOrder });
//   } catch (error) {
//     console.error("Error deleting order:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
