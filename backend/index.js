// // external
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const globalErrorHandler = require("./middleware/global-error-handler");
// // internal
// const ConnectDb = require("./config/db");
// const { secret } = require("./config/secret");
// const categoryRoutes = require("./routes/categoryRoutes");
// const productsRoutes = require("./routes/productRoute");
// const couponRoutes = require("./routes/couponRoute");
// const userRoute = require("./routes/userRoute");
// const orderRouter = require("./routes/orderRoute");
// const userOrderRoute = require("./routes/userOrderRoute");
// const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const brandRoutes = require("./routes/brandRoutes");

// // app init
// const app = express();

// // middleware
// app.use(express.json());
// app.use(cors());

// // run db
// ConnectDb();

// // routes
// app.use("/api/products", productsRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/brand", brandRoutes);
// app.use('/api/coupon', couponRoutes);
// app.use('/api/user', userRoute);
// app.use('/api/order', orderRouter);
// app.use('/api/user-order', userOrderRoute);
// app.use("/api/cloudinary", cloudinaryRoutes);
// app.use("/api/admin", adminRoutes);

// // root route
// app.get("/", (req, res) => res.send("Apps worked successfully"));

// const PORT = secret.port || 5000;

// // global error handler
// app.use(globalErrorHandler);
// //* handle not found
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: 'Not Found',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'API Not Found',
//       },
//     ],
//   });
//   next();
// });

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));












// external
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middleware/global-error-handler");

// internal
const ConnectDb = require("./config/db");
const { secret } = require("./config/secret");
const categoryRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productRoute");
const couponRoutes = require("./routes/couponRoute");
const userRoute = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const userOrderRoute = require("./routes/userOrderRoute");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const brandRoutes = require("./routes/brandRoutes");

// app init
const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'https://goodibag.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'https://your-production-domain.com', // Add your actual production domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-API-Key'
  ],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false,
};

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply CORS with options
app.use(cors(corsOptions));

// Additional security headers
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-API-Key');
//   res.header('Access-Control-Allow-Credentials', 'true');
  
//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }
  
//   next();
// });

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin || 'No origin'}`);
  next();
});

// run db
ConnectDb();

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GoodiBag API is running successfully",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      categories: "/api/category",
      brands: "/api/brand",
      coupons: "/api/coupon",
      users: "/api/user",
      orders: "/api/order",
      userOrders: "/api/user-order",
      cloudinary: "/api/cloudinary",
      admin: "/api/admin"
    }
  });
});

// API routes
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/user', userRoute);
app.use('/api/order', orderRouter);
app.use('/api/user-order', userOrderRoute);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

// global error handler
app.use(globalErrorHandler);

// handle not found - Fixed: removed next() call to prevent hanging
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    error: {
      path: req.originalUrl,
      method: req.method,
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
    availableEndpoints: {
      products: "/api/products",
      categories: "/api/category", 
      brands: "/api/brand",
      coupons: "/api/coupon",
      users: "/api/user",
      orders: "/api/order",
      userOrders: "/api/user-order",
      cloudinary: "/api/cloudinary",
      admin: "/api/admin"
    }
  });
});

const PORT = secret.port || 5000;

// Enhanced server startup
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ CORS enabled for origins: ${corsOptions.origin.join(', ')}`);
  
  // Log all registered routes
  console.log('\n📋 Available API Routes:');
  console.log('  GET  / - Root endpoint');
  console.log('  GET  /health - Health check');
  console.log('  *    /api/products/* - Products routes');
  console.log('  *    /api/category/* - Category routes');
  console.log('  *    /api/brand/* - Brand routes');
  console.log('  *    /api/coupon/* - Coupon routes');
  console.log('  *    /api/user/* - User routes');
  console.log('  *    /api/order/* - Order routes');
  console.log('  *    /api/user-order/* - User order routes');
  console.log('  *    /api/cloudinary/* - Cloudinary routes');
  console.log('  *    /api/admin/* - Admin routes');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;