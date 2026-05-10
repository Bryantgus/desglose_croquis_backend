"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CroquisController = void 0;
const catchAsync_1 = require("../middleware/catchAsync");
class CroquisController {
}
exports.CroquisController = CroquisController;
_a = CroquisController;
CroquisController.calculateCroquis = (0, catchAsync_1.catchAsync)(async (req, res) => {
    try {
        const response = await fetch('https://rectpack-allguillotines.onrender.com/pack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: String(error) });
    }
});
