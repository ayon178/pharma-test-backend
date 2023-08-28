"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineRoute = void 0;
const express_1 = __importDefault(require("express"));
const medicine_controller_1 = require("./medicine.controller");
const router = express_1.default.Router();
router.post('/', medicine_controller_1.MedicineController.addMedicine);
router.get('/', medicine_controller_1.MedicineController.getAllMedicine);
router.get('/single/:id', medicine_controller_1.MedicineController.getMedicineById);
router.post('/:id', medicine_controller_1.MedicineController.updateMedicine);
exports.MedicineRoute = router;
