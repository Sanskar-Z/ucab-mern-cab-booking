import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createRide = asyncHandler(async (req, res) => {
    const existingRide = await Ride.findOne({
        user: req.user._id,
        status: { $in: ["requested", "accepted", "ongoing"] }
    });

    if (existingRide) {
        throw new ApiError(400, "You already have a ride");
    }

    const { pickupLocation, dropLocation } = req.body;

    if (
        !pickupLocation?.lat ||
        !pickupLocation?.lng ||
        !dropLocation?.lat ||
        !dropLocation?.lng
    ) {
        throw new ApiError(400, "Valid pickup and drop coordinates required");
    }

    const ride = await Ride.create({
        user: req.user._id,
        pickupLocation,
        dropLocation
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, ride, "Ride created successfully")
        )
})

const assignDriverToRide = asyncHandler(async (req, res) => {
    const { rideId, driverId } = req.params;

    if (!rideId || !driverId) {
        throw new ApiError(400, "All fields are required")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }

    if (ride.driver) {
        throw new ApiError(400, "Driver already assigned to this ride");
    }

    if (ride.status !== "requested") {
        throw new ApiError(400, "Ride is not available for assignment");
    }

    const driver = await User.findById(driverId)

    if (!driver) {
        throw new ApiError(404, "Driver not found")
    }

    if (driver.role !== "driver") {
        throw new ApiError(403, "Invalid driver")
    }

    if (driver.isAvailable === false) {
        throw new ApiError(400, "Driver is not available")
    }

    ride.driver = driverId;
    driver.isAvailable = false;

    await ride.save({ validateBeforeSave: false });
    await driver.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Driver assigned to ride successfully")
        )
})

const acceptRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params

    if (!rideId) {
        throw new ApiError(400, "RideId required")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }

    if (!ride.driver.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to accept this ride")
    }

    if (ride.status !== "requested") {
        throw new ApiError(400, "Ride is already accepted or rejected")
    }

    ride.status = "accepted";
    await ride.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Ride accepted successfully")
        )
})

const rejectRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params

    if (!rideId) {
        throw new ApiError(400, "RideID required")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found");
    }

    if (!ride.driver.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to reject the ride")
    }

    if (ride.status !== "requested") {
        throw new ApiError(400, "Ride is already accepted or rejected")
    }
    ride.status = "rejected";

    const driver = await User.findById(ride.driver);

    if (!driver) {
        throw new ApiError(404, "Driver not found")
    }

    driver.isAvailable = true;

    await driver.save({ validateBeforeSave: false });
    await ride.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Ride rejected successfully")
        )
})

const startRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params;

    if (!rideId) {
        throw new ApiError(400, "RideID required")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }

    if (!ride.driver.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to start this ride")
    }

    if (ride.status !== "accepted") {
        throw new ApiError(400, "Ride is not accepted yet")
    }

    ride.status = "ongoing";
    await ride.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Ride started successfully")
        )
})

const completeRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params;

    if (!rideId) {
        throw new ApiError(400, "RideID required")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }

    if (!ride.driver.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to complete this ride")
    }

    if (ride.status !== "ongoing") {
        throw new ApiError(400, "Ride is not ongoing yet")
    }

    const driver = await User.findById(ride.driver);

    if (!driver) {
        throw new ApiError(404, "Driver not found")
    }

    driver.isAvailable = true;
    ride.status = "completed";

    await driver.save({ validateBeforeSave: false })
    await ride.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Ride completed successfully")
        )
})

const cancelRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params;

    if (!rideId) {
        throw new ApiError(400, "RideID required")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }

    if (!ride.user.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to cancel this ride")
    }

    if (ride.status === "completed" || ride.status === "cancelled") {
        throw new ApiError(400, "Ride is already completed or cancelled")
    }

    if (ride.status === "ongoing") {
        throw new ApiError(400, "Ride is already ongoing")
    }

    if (ride.status === "requested" || ride.status === "accepted") {
        ride.status = "cancelled";

        if (ride.driver) {
            const driver = await User.findByIdAndUpdate(
                ride?.driver,
                {
                    $set: {
                        isAvailable: true
                    }
                },
                { new: true }
            )

            if (!driver) {
                throw new ApiError(404, "Driver not found")
            }
        }
        await ride.save({ validateBeforeSave: false })

        return res
            .status(200)
            .json(
                new ApiResponse(200, ride, "Ride cancelled successfully")
            )
    }
})

// fetch ride details
const getRideById = asyncHandler(async (req, res) => {
    const { rideId } = req.params;

    if (!rideId) {
        throw new ApiError(400, "RideID required")
    }

    const ride = await Ride.findById(rideId)
        .populate("user", "name phone")
        .populate("driver", "name phone vehicleDetails")

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Ride fetched successfully")
        )
})


// get ride history for logged in user
const getUserRideHistory = asyncHandler(async (req, res) => {
    const rides = await Ride.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "driver",
                foreignField: "_id",
                as: "driverDetails"
            }
        },
        {
            $unwind: {
                path: "$driverDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                pickupLocation: 1,
                dropLocation: 1,
                fare: 1,
                status: 1,
                createdAt: 1,
                "driverDetails.name": 1,
                "driverDetails.phone": 1,
                "driverDetails.vehicleDetails": 1
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, rides, "User ride history fetched successfully")
        )
})

// get driver ride history
const getDriverRideHistory = asyncHandler(async (req, res) => {
    const rides = await Ride.aggregate([
        {
            $match: {
                driver: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: {
                path: "$userDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                pickupLocation: 1,
                dropLocation: 1,
                fare: 1,
                status: 1,
                createdAt: 1,
                "userDetails.name": 1,
                "userDetails.phone": 1,
                "userDetails.vehicleDetails": 1
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, rides, "Driver ride history fetched successfully")
        )
})


// get user active ride
const getUserActiveRide = asyncHandler(async (req, res) => {
    const ride = await Ride.findOne({
        user: req.user._id,
        status: {
            $in: ["requested", "accepted", "ongoing"]
        }
    })

    if (!ride) {
        throw new ApiError(404, "No active ride found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Active ride fetched successfully")
        )
})

// get driver active ride
const getDriverActiveRide = asyncHandler(async (req, res) => {
    const ride = await Ride.findOne({
        driver: req.user._id,
        status: {
            $in: ["accepted", "ongoing"]
        }
    })

    if (!ride) {
        throw new ApiError(404, "No active ride found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, ride, "Active ride fetched successfully")
        )
})

export {
    createRide,
    assignDriverToRide,
    acceptRide,
    rejectRide,
    startRide,
    completeRide,
    cancelRide,
    getRideById,
    getUserRideHistory,
    getDriverRideHistory,
    getUserActiveRide,
    getDriverActiveRide
}