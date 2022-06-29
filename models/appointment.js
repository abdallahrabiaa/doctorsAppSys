const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    doctor: {
        type: Types.ObjectId,
        ref: "Doctor",
        required: true,

    },
    patient: {
        type: Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    state: {
        type: String,
        default: "waiting"

    },
    cost: {
        type: Number
    },
    notes: {
        type: String
    }

}, { timestamps: true });


module.exports = model('appointment', AppointmentSchema);