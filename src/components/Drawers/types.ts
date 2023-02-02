export interface categoryArrayI {
  parent_id: any
  slug: any
  image: any
  id: null | number
  name_uz: string
  name_ru: string
}
export interface categoryI {
  isOk: boolean
  categories: categoryArrayI[]
}
export interface brandsPagination {
  total: number
  current: number
  per_page: number
  total_pages: number
  next: null | number
  previous: null | number
}
export interface brandsArrayI {
  id: null | number
  name_uz: string
  name_ru: string
  image: string
}
export interface brandsI {
  isOk: boolean
  pagination: brandsPagination
  brands: brandsArrayI[]
}

export interface DeleteI {
  visible: boolean
  title: string
  loading?: boolean
  onOkHandler: () => void
  onCancelHandler: () => void
}

export interface PostProductI {
  id:number | null
  name_uz: string
  name_ru: string
  description_uz: string
  description_ru: string
  slug: string
  category_id: number |null
  brand_id: number | null
  quantity: number | null
  attributes: string
  previous_price: number | null
  price: number | null
  image: string
  images:string
  discount: number | null
}
