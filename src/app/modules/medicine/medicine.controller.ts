import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { MedicineService } from './medicine.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import pick from '../../../shared/pick'
import { MEDICINE_FILTER_FIELDS } from './medicine.constant'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'

const addMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicine = await MedicineService.addMedicine(req.body)
  const responseData = {
    data: medicine,
    message: 'Medicine added successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getAllMedicine = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...MEDICINE_FILTER_FIELDS])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)
  const medicine = await MedicineService.getAllMedicine(
    filters,
    paginationOption
  )
  const responseData = {
    statusCode: httpStatus.OK,
    meta: medicine.meta || {},
    data: medicine.data || [],
    message: 'Medicine fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  const medicine = await MedicineService.getMedicineById(req.params.id)
  const responseData = {
    data: medicine,
    message: 'Medicine fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const { quantity } = req.body
  const medicine = await MedicineService.updateMedicine(
    req.params.id,
    Number(quantity)
  )
  const responseData = {
    data: medicine,
    message: 'Order placed successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const MedicineController = {
  addMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
}
