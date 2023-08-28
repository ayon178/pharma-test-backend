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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const medicine_model_1 = __importDefault(require("./medicine.model"));
const medicine_constant_1 = require("./medicine.constant");
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const addMedicine = (medicineData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield medicine_model_1.default.findOne({
        brandName: medicineData.brandName,
        form: medicineData.form,
    });
    if (isExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Medicine already exist');
    const medicine = yield medicine_model_1.default.create(medicineData);
    if (!medicine)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Medicine creation failed');
    return medicine;
});
const getAllMedicine = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: medicine_constant_1.MEDICINE_SEARCH_FIELDS.map(field => ({
                [field]: new RegExp(searchTerm, 'i'),
            })),
        });
    }
    if (Object.keys(filterFields).length) {
        const fieldConditions = Object.entries(filterFields).map(([key, value]) => {
            return {
                [key]: value,
            };
        });
        andConditions.push({
            $and: fieldConditions,
        });
    }
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield medicine_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield medicine_model_1.default.countDocuments();
    const responseData = {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
    return responseData;
});
const getMedicineById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const medicine = yield medicine_model_1.default.findById(id);
    if (!medicine)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Medicine not found');
    return medicine;
});
const updateMedicine = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield medicine_model_1.default.findById(id);
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Medicine not found');
    const medicine = yield medicine_model_1.default.findByIdAndUpdate(id, { $set: { quantity } }, { new: true });
    console.log(medicine, '==============');
    if (!medicine)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Something went wrong');
    return medicine;
});
exports.MedicineService = {
    addMedicine,
    getAllMedicine,
    getMedicineById,
    updateMedicine,
};
