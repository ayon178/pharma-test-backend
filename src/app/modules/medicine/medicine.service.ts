import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IMedicine, IMedicineFilters } from './medicine.interface'
import MedicineModel from './medicine.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { MEDICINE_SEARCH_FIELDS } from './medicine.constant'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const addMedicine = async (medicineData: IMedicine): Promise<IMedicine> => {
  const isExist = await MedicineModel.findOne({
    brandName: medicineData.brandName,
    form: medicineData.form,
  })
  if (isExist)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Medicine already exist')
  const medicine = await MedicineModel.create(medicineData)
  if (!medicine)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Medicine creation failed')
  return medicine
}

const getAllMedicine = async (
  filters: IMedicineFilters,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IMedicine[]>> => {
  const { searchTerm, ...filterFields } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: MEDICINE_SEARCH_FIELDS.map(field => ({
        [field]: new RegExp(searchTerm, 'i'),
      })),
    })
  }

  if (Object.keys(filterFields).length) {
    const fieldConditions = Object.entries(filterFields).map(([key, value]) => {
      return {
        [key]: value,
      }
    })

    andConditions.push({
      $and: fieldConditions,
    })
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await MedicineModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await MedicineModel.countDocuments()

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  return responseData
}

const getMedicineById = async (id: string): Promise<IMedicine> => {
  const medicine = await MedicineModel.findById(id)
  if (!medicine) throw new ApiError(httpStatus.NOT_FOUND, 'Medicine not found')
  return medicine
}

const updateMedicine = async (
  id: string,
  quantity: number
): Promise<IMedicine> => {
  const isExist = await MedicineModel.findById(id)
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Medicine not found')
  const medicine = await MedicineModel.findByIdAndUpdate(
    id,
    { $set: { quantity } },
    { new: true }
  )
  console.log(medicine, '==============')
  if (!medicine)
    throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong')
  return medicine
}

export const MedicineService = {
  addMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
}
