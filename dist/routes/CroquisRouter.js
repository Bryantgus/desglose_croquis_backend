"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CroquisController_1 = require("../controllers/CroquisController");
const router = (0, express_1.Router)();
router.post('/', CroquisController_1.CroquisController.calculateCroquis);
exports.default = router;
