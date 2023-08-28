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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const customResponse_1 = require("./shared/customResponse");
// Import routes
const index_1 = __importDefault(require("./app/routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Testing route
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = {
        message: 'Welcome to Express API template',
        data: null,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
// All routes here
app.use('/api/v1', index_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
// Forbidden routes
app.all('*', (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: 'false',
        message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
        errorMessages: [
            {
                message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
                path: req.originalUrl,
            },
        ],
        stack: '',
    });
});
exports.default = app;
