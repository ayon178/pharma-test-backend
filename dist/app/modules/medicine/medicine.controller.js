"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const medicine_service_1 = require("./medicine.service");
const customResponse_1 = require("../../../shared/customResponse");
const pick_1 = __importDefault(require("../../../shared/pick"));
const medicine_constant_1 = require("./medicine.constant");
const shared_constant_1 = require("../../../constant/shared.constant");
const http_status_1 = __importDefault(require("http-status"));
const addMedicine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicine = yield medicine_service_1.MedicineService.addMedicine(req.body);
    const responseData = {
        data: medicine,
        message: 'Medicine added successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getAllMedicine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm', ...medicine_constant_1.MEDICINE_FILTER_FIELDS]);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const medicine = yield medicine_service_1.MedicineService.getAllMedicine(filters, paginationOption);
    const responseData = {
        statusCode: http_status_1.default.OK,
        meta: medicine.meta || {},
        data: medicine.data || [],
        message: 'Medicine fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getMedicineById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicine = yield medicine_service_1.MedicineService.getMedicineById(req.params.id);
    const responseData = {
        data: medicine,
        message: 'Medicine fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const updateMedicine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body;
    const medicine = yield medicine_service_1.MedicineService.updateMedicine(req.params.id, Number(quantity));
    const responseData = {
        data: medicine,
        message: 'Order placed successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.MedicineController = {
    addMedicine,
    getAllMedicine,
    getMedicineById,
    updateMedicine,
};
