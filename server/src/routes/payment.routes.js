import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPayment, completePayment, getPaymentByRide } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create", verifyJWT, createPayment);

router.post("/complete/:paymentId", verifyJWT, completePayment);

router.get("/ride/:rideId", verifyJWT, getPaymentByRide);

export default router;