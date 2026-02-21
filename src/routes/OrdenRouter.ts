import { Router } from "express";
import { OrdenController } from "../controllers/OrdenController";

const router = Router();

router.post('/', OrdenController.create)
router.get('/', OrdenController.getAll)
router.patch('/:id', OrdenController.modify)
export default router;  