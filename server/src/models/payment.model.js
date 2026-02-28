import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        ride: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ride",
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "card", "upi"],
            default: "cash"
        }
    },
    { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);