'use strict';

var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    image: { type: String },
    text: { type: String }
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

module.exports = GroupSchema;
