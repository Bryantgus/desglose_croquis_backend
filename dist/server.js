"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrdenRouter_1 = __importDefault(require("./routes/OrdenRouter"));
const errorHandler_1 = require("./middleware/errorHandler");
const cors_1 = __importDefault(require("cors"));
const ItemOrdenRouter_1 = __importDefault(require("./routes/ItemOrdenRouter"));
const CroquisRouter_1 = __importDefault(require("./routes/CroquisRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL, // La URL de tu frontend (Vite por defecto)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // Por si luego usas cookies o sesiones
}));
app.use(express_1.default.json());
app.get('/api/server_active', (req, res) => {
    return res.status(200).send();
});
app.use('/api/orden', OrdenRouter_1.default);
app.use('/api/item_orden', ItemOrdenRouter_1.default);
app.use('/api/croquis', CroquisRouter_1.default);
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
