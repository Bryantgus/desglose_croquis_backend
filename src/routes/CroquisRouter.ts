import { Router } from "express";
import { CroquisController } from "../controllers/CroquisController";

const router = Router();

router.post('/', CroquisController.calculateCroquis)

export default router