import { Router } from "express";
import { ItemOrdenController } from "../controllers/ItemOrdenController";

const router = Router();

router.post('/:ordenId', ItemOrdenController.create)
router.get('/:ordenId', ItemOrdenController.getAllByTipoPerfil)
router.patch('/:itemOrdenId/orden/:ordenId', ItemOrdenController.modify)
router.delete('/:itemOrdenId/orden/:ordenId', ItemOrdenController.delete)

export default router;  