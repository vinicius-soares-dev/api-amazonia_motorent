"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reserveDataSchema = new mongoose_1.default.Schema({
    fullname: String,
    email: String,
    phone: String,
    date: { type: Date, required: true },
});
reserveDataSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
reserveDataSchema.set('toJSON', {
    virtuals: true,
});
module.exports = mongoose_1.default.model("Reservations", reserveDataSchema);
