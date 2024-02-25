import {Router} from 'express'
import { createItem, getItemsByName, deleteItem, updateItem } from '../controllers/item.controller.js';



const router = Router();

router.post('/', createItem)
router.get('/:name', getItemsByName)
router.delete('/', deleteItem)
router.put('/', updateItem)



export default router