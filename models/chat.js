const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const ChatSchema = new Schema({
    appointment: {
        type: Types.ObjectId, required: true, ref: "appointment",
        required: true,
    },
    messages: [{
        message: String, type: {
            type: String

        },
        date: {
            type: Date,
            default: new Date()
        }
    }],
    type: {
        type: String,
        default: "main"
    },
    doctor: { type: Types.ObjectId, required: true, ref: "Doctor" },
    patient: { type: Types.ObjectId, required: true, ref: "Patient" },
}, { timestamps: true });


module.exports = model('Chat', ChatSchema);