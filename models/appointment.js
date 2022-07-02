const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const CHAT = require('../models/chat');
const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
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
    online: {
        type: Boolean,
        default: false,
    }
    ,
    state: {
        type: String,
        default: "waiting"

    },
    cost: {
        type: Number,
        required: true,
    },
    notes: {
        type: String
    }

}, { timestamps: true });

AppointmentSchema.post("save", handleAppointment)
async function handleAppointment(doc) {
    if (doc.state !== "waiting") return;
    const chat = await CHAT.create({ appointment: doc._id, doctor: doc.doctor, patient: doc.patient });
    console.log(chat);
}
module.exports = model('appointment', AppointmentSchema);