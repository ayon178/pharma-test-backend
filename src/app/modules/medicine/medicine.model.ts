import { Schema, model } from 'mongoose'
import { IMedicine } from './medicine.interface'

const medicineSchema = new Schema<IMedicine>({
  brandName: { type: String, required: true },
  genericName: { type: String, required: true },
  company: { type: String, required: true },
  form: { type: String, required: true },
  variant: { type: String, required: true },
  unitPrice: {
    title: { type: String, required: true },
    price: { type: Number, required: true },
  },

  quantity: { type: Number, required: true },
})

const MedicineModel = model('Medicine', medicineSchema)
export default MedicineModel
