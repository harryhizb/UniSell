// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema(
//   {
//     orderId: String,
//     products: [
//       {
//         productId: { type: String, required: true },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     amount: Number,
//     email: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "completed"],
//       default: "pending",
//     },
//     shippingDetails: {
//       address: String,
//       city: String,
//       postalCode: String,
//       country: String,
//     },
//     sellerId: { type: String, required: true },
//     orderUpdates: [
//       {
//         status: { type: String },
//         timestamp: { type: Date, default: Date.now },
//       },
//     ],
//     notificationSent: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model("Order", OrderSchema);
// module.exports = Order;
