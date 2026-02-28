import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))          // use method is used for configuration or middlewares

app.use(express.json({ limit: "16kb" }));         // Converts incoming JSON → req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Parses HTML form data  // Handles application/x-www-form-urlencoded
app.use(express.static("public"))
app.use(cookieParser())


// routes
import userRoutes from "./routes/user.routes.js"

app.use("/api/v1/users", userRoutes)

export { app }