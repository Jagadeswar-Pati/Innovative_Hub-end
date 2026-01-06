require("dotenv").config();
const mongoose = require("mongoose");

// Models
const User = require("./src/models/User.model");
const Product = require("./src/models/Product.model");
const Order = require("./src/models/Order.model");
const Payment = require("./src/models/Payment.model");
const Review = require("./src/models/Review.model");
const Notification = require("./src/models/Notification.model");

const MONGO_URI = process.env.MONGO_URI;

async function seedData() {
  try {
    // ---------------- CONNECT ----------------
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // ---------------- CLEAR DB ----------------
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Payment.deleteMany({}),
      Review.deleteMany({}),
      Notification.deleteMany({}),
    ]);
    console.log("✅ Old data removed");

    // ---------------- USERS ----------------
    const users = await User.insertMany([
      {
        externalId: "USR001",
        name: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        mobile: "+91 9876543210",
        status: "active",
      },
      {
        externalId: "USR002",
        name: "Priya Patel",
        email: "priya.patel@email.com",
        mobile: "+91 9876543211",
        status: "active",
      },
      {
        externalId: "USR003",
        name: "Amit Kumar",
        email: "amit.kumar@email.com",
        mobile: "+91 9876543212",
        status: "blocked",
      },
    ]);
    console.log("✅ Users seeded");

    const userMap = {};
    users.forEach(u => (userMap[u.externalId] = u._id));

    // ---------------- PRODUCTS ----------------
    const products = await Product.insertMany([
      {
        externalId: "PRD001",
        name: "Arduino Uno R3",
        sku: "ARD-UNO-001",
        mrp: 799,
        sellingPrice: 649,
        shortDescription: "Classic Arduino board",
        longDescription: "Arduino Uno based on ATmega328P",
        stockStatus: "in_stock",
      },
      {
        externalId: "PRD002",
        name: "ESP32 Dev Board",
        sku: "ESP-32-002",
        mrp: 599,
        sellingPrice: 449,
        shortDescription: "WiFi & Bluetooth board",
        longDescription: "ESP32 for IoT applications",
        stockStatus: "in_stock",
      },
      {
        externalId: "PRD003",
        name: "Raspberry Pi 4",
        sku: "RPI-4-4GB",
        mrp: 5999,
        sellingPrice: 5499,
        shortDescription: "Single board computer",
        longDescription: "Raspberry Pi 4 Model B",
        stockStatus: "in_stock",
      },
    ]);
    console.log("✅ Products seeded");

    const productMap = {};
    products.forEach(p => (productMap[p.externalId] = p._id));

    // ---------------- ORDERS ----------------
    const orders = await Order.insertMany([
      {
        externalId: "ORD-2024-001",
        user: userMap["USR001"],
        items: [
          { product: productMap["PRD001"], quantity: 2, price: 649 },
          { product: productMap["PRD002"], quantity: 1, price: 449 },
        ],
        totalAmount: 1747,
        paymentStatus: "paid",
        orderStatus: "delivered",
      },
      {
        externalId: "ORD-2024-002",
        user: userMap["USR002"],
        items: [
          { product: productMap["PRD003"], quantity: 1, price: 5499 },
        ],
        totalAmount: 5499,
        paymentStatus: "paid",
        orderStatus: "confirmed",
      },
      {
        externalId: "ORD-2024-003",
        user: userMap["USR003"],
        items: [
          { product: productMap["PRD002"], quantity: 3, price: 449 },
        ],
        totalAmount: 1347,
        paymentStatus: "unpaid",
        orderStatus: "pending",
      },
    ]);
    console.log("✅ Orders seeded");

    const orderMap = {};
    orders.forEach(o => (orderMap[o.externalId] = o._id));

    // ---------------- PAYMENTS ----------------
    await Payment.insertMany([
      {
        externalId: "PAY001",
        order: orderMap["ORD-2024-001"],
        amount: 1747,
        status: "success",
        method: "UPI",
        transactionId: "TXN123456",
      },
      {
        externalId: "PAY002",
        order: orderMap["ORD-2024-002"],
        amount: 5499,
        status: "success",
        method: "Card",
        transactionId: "TXN654321",
      },
    ]);
    console.log("✅ Payments seeded");

    // ---------------- REVIEWS ----------------
    await Review.insertMany([
      {
        externalId: "REV001",
        user: userMap["USR001"],
        product: productMap["PRD001"],
        rating: 5,
        comment: "Excellent board!",
        status: "approved",
      },
      {
        externalId: "REV002",
        user: userMap["USR002"],
        product: productMap["PRD002"],
        rating: 4,
        comment: "Good for IoT projects",
        status: "pending",
      },
    ]);
    console.log("✅ Reviews seeded");

    // ---------------- NOTIFICATIONS ----------------
    await Notification.insertMany([
      {
        externalId: "NOT001",
        type: "order",
        title: "New Order",
        message: "Order ORD-2024-003 placed",
        read: false,
      },
      {
        externalId: "NOT002",
        type: "system",
        title: "Low Stock",
        message: "ESP32 stock running low",
        read: false,
      },
    ]);
    console.log("✅ Notifications seeded");

    console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedData();
