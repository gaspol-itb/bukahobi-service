'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_id: { type: String, required: true }
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

UserSchema.index({ user_id: 1 }, { unique: true });

module.exports = UserSchema;
