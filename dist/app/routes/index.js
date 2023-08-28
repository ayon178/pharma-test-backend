"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicine_route_1 = require("../modules/medicine/medicine.route");
const router = express_1.default.Router();
const routes = [
    {
        path: '/medicine',
        route: medicine_route_1.MedicineRoute,
    },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
