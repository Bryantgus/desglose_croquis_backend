import { Router } from "express";
import { ItemOrdenController } from "../controllers/ItemOrdenController";

const router = Router();

router.post('/orden/:ordenId', ItemOrdenController.create)
router.get('/', ItemOrdenController.getAll)
// router.get('/:idItem', ItemOrdenController.getById)
// router.patch('/:itemId/orden/:ordenId', ItemOrdenController.modify)
router.delete('/:itemId/orden/:ordenId', ItemOrdenController.delete)

export default router;  