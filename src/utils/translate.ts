interface Trans {
    cancel: string;
    products: string;
    atributs: string;
    product: string;
    orders: string;
    categories: string;
    pages: string;
    brands: string;
    banners: string;
    create_pruduct: string;
    create_category: string;
    create_brand: string;
    name: string;
    image: string;
    price: string;
    create_a_new_product: string;
    product_name_uz: string;
    product_name_ru: string;
    slug: string;
    description_uz: string;
    description_ru: string;
    select_category: string;
    select_brand: string;
    attributes: string;
    discount: string;
    previos_price: string;
    quantity: string;
    submit: string;
    upload: string;
    delete: string;
    no: string;
    yes: string;
    create_a_new_category: string;
    create_a_new_brand: string;
    parent_id: string;
    action: string;
    name_uz: string;
    click_to_upload: string;
    catedory_deleted: string;
    // attribute_deleted: string;
    want_cate: string;
    want_att: string;
    d_product: string;
    create_a_new_attribute: string
    create_attribute:string
}
const uz: Trans = {
    cancel: "Bekor qilish",
    products: "Mahsulotlar",
    atributs: "Atribut",
    product: "Mahsulot",
    orders: "Buyurtmalar",
    categories: "Toifalar",
    pages: "Sahifalar",
    brands: "Brendlar",
    banners: "Bannerlar",
    create_pruduct: "Mahsulot yaratish",
    create_category: "Kategoriya yaratish",
    create_brand: "Brendlar yaratish",
    name: "Nomi",
    image: "Rasm",
    price: "Narxi",
    create_a_new_product: "Yangi maxsulot yaratish",
    product_name_uz: "Mahsulot nomi uz",
    product_name_ru: "Maxsulot nomi ru",
    slug: "slug",
    description_uz: "Izoh uz",
    description_ru: "Izoh ru",
    select_category: "Kategoriyani tanlash",
    select_brand: "Brendni tanlash",
    attributes: "Atributlar",
    discount: "Chegirma",
    previos_price: "Avvalgi narx",
    quantity: "Soni",
    submit: "Tasdiqlash",
    upload: "Yuklash",
    delete: "O'chirish",
    no: "YO'Q",
    yes: "HA",
    create_a_new_category: "Yangi kategoriya yaratish",
    parent_id: "Parent",
    action: "Harakat",
    name_uz: "Nomi uz",
    click_to_upload: "Yuklash uchun bosing",
    create_a_new_brand: "Yangi brendlarni yaratish",
    create_a_new_attribute: "Yangi attribute yaratish",
    catedory_deleted: "Muaffaqiyatli o`chirildi",
    want_cate: "Categoriyani o`chirib tashlamoqchimisiz?",
    want_att: "Attributni o`chirib tashlamoqchimisiz?",
    d_product: "Maxsulotni o`chirib tashlamoqchimisiz?",
    create_attribute: "Attribute yaratish",
};
const ru: Trans = {
    cancel: "????????????",
    products: "????????????????",
    atributs: "??????????????",
    product: "??????????????",
    orders: "????????????",
    categories: "??????????????????",
    pages: "????????????????",
    brands: "????????????",
    banners: "??????????????",
    create_pruduct: "???????????????? ????????????????",
    create_category: "?????????????? ??????????????????",
    create_attribute: "?????????????? ????????????????",
    create_brand: "?????????????? ????????????",
    name: "??????",
    image: "??????????????",
    price: "??????????????",
    create_a_new_product: "?????????????? ?????????? ??????????????",
    product_name_uz: "???????????????????????? ????????????",
    product_name_ru: "???????????????? ???????????????? ru",
    slug: "????????",
    description_uz: "???????????????????? uz",
    description_ru: "???????????????????? ru",
    select_category: "???????????????? ??????????????????",
    select_brand: "?????????? ????????????",
    attributes: "????????????????",
    discount: "????????????",
    previos_price: "???????????????????? ????????",
    quantity: "??????????",
    submit: "??????????????????????????",
    upload: "??????????????????",
    delete: "??????????????",
    no: "??????",
    yes: "????",
    create_a_new_category: "?????????????? ?????????? ??????????????????",
    parent_id: "????????????????",
    action: "????????????????",
    name_uz: "??????",
    click_to_upload: "??????????????, ?????????? ??????????????????",
    create_a_new_brand: "?????????????? ?????????? ????????????",
    catedory_deleted: "?????????????? ??????????????",
    want_cate: "???? ???????????? ?????????????? ???????????????????",
    want_att: "???? ???????????? ?????????????? ?????????????????",
    d_product: "???? ???????????? ?????????????? ?????????????????",
    create_a_new_attribute:'?????????????? ?????????? ????????????????'
};
interface LanguageKeyValuePairs {
    [key: string]: Trans;
}
export const languages: LanguageKeyValuePairs = { uz, ru };
