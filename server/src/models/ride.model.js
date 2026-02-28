import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        pickupLocation: {
            address: String,
            lat: Number,
            lng: Number
        },

        dropLocation: {
            address: String,
            lat: Number,
            lng: Number
        },

        // Live location updates
        currentLocation: {
            lat: Number,
            lng: Number
        },

        distance: {
            type: Number
        },

        fare: {
            type: Number
        },

        status: {
            type: String,
            enum: [
                "requested",
                "accepted",
                "ongoing",
                "completed",
                "cancelled"
            ],
            default: "requested"
        }
    },
    { timestamps: true }
);

export const Ride = mongoose.model("Ride", rideSchema);