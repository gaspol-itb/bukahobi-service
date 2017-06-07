'use strict';

var mongoose = require('mongoose');

var FundingSchema = new mongoose.Schema({
    event_id: { type: String, required: true },
    user_id: { type: String, required: true },
    amount: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            ret.created = ret.createdAt;
            ret.updated = ret.updatedAt;

            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;

            return ret;
        }
    }
});

module.exports = FundingSchema;
