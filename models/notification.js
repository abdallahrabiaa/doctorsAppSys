const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const NontificationSchema = new Schema({
    data: {
        type: String,
        required: true,
    },
    object: {
        type: Object
    },
    type: {
        type: String,
        default: "main"
    },
    users: [{ type: Types.ObjectId }]
}, { timestamps: true });


module.exports = model('Notification', NontificationSchema);