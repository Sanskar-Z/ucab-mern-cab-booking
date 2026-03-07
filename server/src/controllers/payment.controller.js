import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Payment } from "../models/payment.model.js";
import { Ride } from "../models/ride.model.js";

const createPayment = asyncHandler(async (req, res) => {
    const { rideId, paymentMethod } = req.body;

    if (!rideId) {
        throw new ApiError(400, "RideId is required");
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found");
    }

    if (ride.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized access to this ride");
    }

    if (ride.status !== "completed") {
        throw new ApiError(400, "Ride is not completed yet");
    }

    const existingPayment = await Payment.findOne({ ride: rideId });

    if (existingPayment) {
        throw new ApiError(400, "Payment already created for this ride");
    }

    const payment = await Payment.create({
        ride: rideId,
        user: req.user._id,
        amount: ride.fare,
        paymentMethod: paymentMethod || "cash",
        status: "pending",
    });

    return res
        .status(201)
        .json(new ApiResponse(201, payment, "Payment created successfully"));
});

const completePayment = asyncHandler(async (req, res) => {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
        throw new ApiError(404, "Payment not found");
    }

    if (payment.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    if (payment.status === "completed") {
        throw new ApiError(400, "Payment already completed");
    }

    payment.status = "completed";
    await payment.save();

    return res
        .status(200)
        .json(new ApiResponse(200, payment, "Payment completed successfully"));
});


const getPaymentByRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params;

    const payment = await Payment.findOne({
        ride: rideId,
        user: req.user._id,
    });

    if (!payment) {
        throw new ApiError(404, "Payment not found for this ride");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, payment, "Payment fetched successfully"));
});


export {
    createPayment,
    completePayment,
    getPaymentByRide,
};