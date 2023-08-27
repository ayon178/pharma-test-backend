export interface IMedicine {
  brandName: string
  genericName: string
  company: string
  form: string
  variant: string
  unitPrice: {
    title: string
    price: number
  }
  quantity: number
}

export interface IMedicineFilters {
  searchTerm?: string
}
