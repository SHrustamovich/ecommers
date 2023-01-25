import { PaginationI } from "./AllProducts"

export interface IProducts {
    id:number
    product_id:null | number
    slug:string
    name_uz:string
    desc_short_ru:null | number
}

interface childrenI {
    id:number |null
    name_uz:string
    name_ru:string
    image:string
    slug:string
    parent_id:number
    position:null |number
    views:number
    is_featured:number
    status:number
    priority:number
}

export interface categoryArrayI {
    id:number 
    name_uz:string
    name_ru:string
    image:string
    slug:string
    parent_id:number
    position:null | number
    views:number
    is_featured:number
    status:number
    priority:number
    children:childrenI[]
}

export interface categoryI{
    isOk:boolean
    categories:categoryArrayI[]
}
// brands interface
export interface brandsListI {
    id:number
    name_uz:string
    name_ru:string
    slug:string
    image:string
    updated_at:string
}
export interface brandsI {
    isOk:boolean
    pagination:PaginationI
    brands:brandsListI[]
}
// orders
export interface ordersArrayI {
    id:number | null
    delivery_address:string
    delivery_phone:string
    full_name:string
    order_it:orderedItemI[]
}
export interface orderedItemI {
        name_uz:string
        name_ru:string
}
export interface orderI {
    pagination:PaginationI
    orders:ordersArrayI[]
}