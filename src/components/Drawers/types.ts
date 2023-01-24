export interface categoryArrayI {
    id: null | number
    name_uz: string
    name_ru:string
  }
export  interface categoryI {
    isOk: boolean
    categories: categoryArrayI[]
  }
export interface brandsPagination {
    total:number
    current:number
    per_page:number
    total_pages:number
    next:null | number
    previous:null | number
}
export interface brandsArrayI {
    id:null | number
    name_uz:string
    name_ru:string
    image:string
}
export interface brandsI {
    isOk:boolean
    pagination:brandsPagination
    brands:brandsArrayI[]
}

export interface DeleteI {
  visible: boolean
	title: string
	loading?: boolean
	onOkHandler: () => void
	onCancelHandler: () => void
}
