"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicineSchema = new mongoose_1.Schema({
    brandName: { type: String, required: true },
    genericName: { type: String, required: true },
    company: { type: String, required: true },
    form: { type: String, required: true },
    variant: { type: String, required: true },
    unitPrice: {
        title: { type: String, required: true },
        price: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
});
const MedicineModel = (0, mongoose_1.model)('Medicine', medicineSchema);
exports.default = MedicineModel;
