import express from 'express'
import { MedicineRoute } from '../modules/medicine/medicine.route'

const router = express.Router()

const routes = [
  {
    path: '/medicine',
    route: MedicineRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
