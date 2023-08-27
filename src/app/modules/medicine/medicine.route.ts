import express from 'express'
import { MedicineController } from './medicine.controller'

const router = express.Router()

router.post('/', MedicineController.addMedicine)
router.get('/', MedicineController.getAllMedicine)
router.get('/single/:id', MedicineController.getMedicineById)

export const MedicineRoute = router
