const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const bcrypt = require('bcrypt');
const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true,


    },
    email: {
        type: String,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true,

    },
    balance: {
        type: Number,
        default: 0,
    },
    hourCost: {
        type: Number,
        default: 0,
    },
    workHours: [{ type: Number }],
    adress: {
        type: String,
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    }


}, { timestamps: true });
DoctorSchema.pre('save', function (next) {
    if (this.createdAt === this.updatedAt) {
        this.password = bcrypt.hashSync(this.password, 12)
    }
    next();
});


module.exports = model('Doctor', DoctorSchema);