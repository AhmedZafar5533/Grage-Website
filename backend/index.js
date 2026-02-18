import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Imports
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import morgan from "morgan";

// 1. Configuration
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 4000;

// Optional: Log URI to debug (Remove in production)
// console.log("Connecting to:", process.env.MONGODB_URI);

// 2. Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("json spaces", 2);

// 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

// 4. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    errors: err.errors || [],
  });
});

// 5. Database Connection & Server Startup
// Replaced async/await with .then() .catch()
mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectionInstance) => {
    console.log(
      `MONGODB Connected Successfully !! Host: ${connectionInstance.connection.host}`,
    );

    // Start server only after DB connection succeeds
    app.listen(port, () => {
      console.log("Server is successfully running on port: ", port);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed:", error);
  });
