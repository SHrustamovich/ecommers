import { brandsArrayI, PostProductI } from "../components/Drawers/types";
import { DataType, PaginationI } from "./AllProducts";

export interface IProducts {
    id: number;
    product_id: null | number;
    slug: string;
    name_uz: string;
    desc_short_ru: null | number;
}

export interface ProductProps {
    open: boolean;
    onClose: () => void;
    editProductItem: PostProductI | null;
}

// category
export interface categoryArrayI {
    id: number | null;
    name_uz: string;
    name_ru: string;
    image: string;
    slug: string;
    parent_id: number | null;
}

export interface categoryI {
    isOk: boolean;
    categories: categoryArrayI[];
}

export interface categoryEdit {
    editData: categoryArrayI | null;
    elementLoading: boolean;
    closeDriver: () => void;
}
// brands interface
export interface brandMain {
    open: boolean;
    onClose: () => void;
    editBrandItem: brandsListI | null;
    clearInputBrands: () => void;
}
export interface brandsListI {
    id: number;
    name_uz: string;
    name_ru: string;
    slug: string;
    image: string;
}
export interface brandsI {
    isOk: boolean;
    pagination: PaginationI;
    brands: brandsListI[];
}
// orders
export interface ordersArrayI {
    id: number | null;
    delivery_address: string;
    delivery_phone: string;
    full_name: string;
    order_it: orderedItemI[];
}
export interface orderedItemI {
    name_uz: string;
    name_ru: string;
}
export interface orderI {
    pagination: PaginationI;
    orders: ordersArrayI[];
}
// attribute
export interface attributes {
    id: number | null;
    is_filterable: number | null;
    slug: string;
    name_uz: string;
    name_ru: string;
    attributeValues: attributeValues[];
}
export interface attributePost {
    name_uz: string;
    name_ru: string;
    is_filterable: number;
}
export interface attributeValues {
    id: number | null;
    attribute_id: number;
    value_uz: string;
    value_ru: string;
}
export interface attributeMain {
    status: string;
    attributes: attributes[];
}

export interface mainAttribute {
    open: boolean;
    onClose: () => void;
    editAttribute: attributes | null;
}
