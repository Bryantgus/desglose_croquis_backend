import { Router } from "express";
import { OrdenController } from "../controllers/OrdenController";

const router = Router();

router.get('/', OrdenController.create)

export default router;