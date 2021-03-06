'use strict';

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    group_id: { type: String, required: true },
    user_id: { type: String, required: true },
    text: { type: String, required: true },
    is_funding: { type: Boolean, required: true },
    current_amount: { type: Number, required: true, default: 0 },
    target_amount: { type: Number, required: true }
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

module.exports = EventSchema;
