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

// Trust proxy for Vercel
app.set('trust proxy', 1);

// Enhanced CORS configuration for Vercel
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://goodibag.vercel.app',
      'https://goodibag-backend.vercel.app',
      /\.vercel\.app$/,  // Allow all vercel apps
      /localhost:\d+$/   // Allow all localhost ports
    ];
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all for now to debug
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-Access-Token',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods'
  ],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Additional manual CORS headers for extra compatibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-Access-Token');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Timeout middleware for Vercel
app.use((req, res, next) => {
  // Set timeout to 8 seconds (less than Vercel's 10s limit)
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(504).json({
        success: false,
        message: 'Request timeout',
        error: 'The request took too long to process'
      });
    }
  }, 8000);
  
  res.on('finish', () => {
    clearTimeout(timeout);
  });
  
  next();
});

// Initialize database connection with better error handling
let dbConnected = false;
ConnectDb()
  .then(() => {
    dbConnected = true;
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    dbConnected = false;
  });

// Health check middleware
app.use((req, res, next) => {
  if (!dbConnected && req.path !== '/' && req.path !== '/health') {
    return res.status(503).json({
      success: false,
      message: 'Database not connected',
      error: 'Service temporarily unavailable'
    });
  }
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// API routes with error handling
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/user', userRoute);
app.use('/api/order', orderRouter);
app.use('/api/user-order', userOrderRoute);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

// root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GoodiBag API is running successfully",
    version: "1.0.0",
    endpoints: [
      "/api/products",
      "/api/category", 
      "/api/brand",
      "/api/coupon",
      "/api/user",
      "/api/order",
      "/api/user-order",
      "/api/cloudinary",
      "/api/admin"
    ]
  });
});

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

const PORT = process.env.PORT || secret.port || 5000;

// For Vercel, export the app
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}