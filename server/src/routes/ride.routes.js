import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createRide, assignDriverToRide, acceptRide, rejectRide, startRide, completeRide, cancelRide, getUserRideHistory, getDriverRideHistory, getRideById, getUserActiveRide, getDriverActiveRide } from "../controllers/ride.controller.js";

const router = Router()

// Create ride
router.post("/", verifyJWT, createRide)

// History
router.get("/user/history", verifyJWT, getUserRideHistory)
router.get("/driver/history", verifyJWT, getDriverRideHistory)

// Active rides
router.get("/user/active", verifyJWT, getUserActiveRide)
router.get("/driver/active", verifyJWT, getDriverActiveRide)

// Ride by ID
router.get("/:rideId", verifyJWT, getRideById)

// Assign driver
router.post("/:rideId/assign/:driverId", verifyJWT, assignDriverToRide)

// Ride lifecycle
router.post("/:rideId/accept", verifyJWT, acceptRide)
router.post("/:rideId/reject", verifyJWT, rejectRide)
router.post("/:rideId/start", verifyJWT, startRide)
router.post("/:rideId/complete", verifyJWT, completeRide)
router.post("/:rideId/cancel", verifyJWT, cancelRide)

export default router