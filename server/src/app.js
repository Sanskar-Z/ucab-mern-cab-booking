import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))          // use method is used for configuration or middlewares

app.use(express.json({ limit: "16kb" }));         // Converts incoming JSON → req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Parses HTML form data  // Handles application/x-www-form-urlencoded
app.use(express.static("public"))
app.use(cookieParser())


// routes
import userRoutes from "./routes/user.routes.js"
import rideRoutes from "./routes/ride.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/rides", rideRoutes)
app.use("/api/v1/payments", paymentRoutes)

// Global error handler (always last)
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});

export { app }