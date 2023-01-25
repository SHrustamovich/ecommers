interface Trans {
    cancel: string
    products:string
    atributs:string
    product:string
    orders:string
    categories:string
    pages:string
    brands:string
    banners:string
    create_pruduct:string
    create_category:string
    create_brand:string
    name:string
    image:string
    price:string
    create_a_new_product:string
    product_name_uz:string
    product_name_ru:string
    slug:string
    description_uz:string
    description_ru:string
    select_category:string
    select_brand:string
    attributes:string
    discount:string
    previos_price:string
    quantity:string
    submit:string
    upload:string
    delete:string
    no:string
    yes:string
    create_a_new_category:string
    create_a_new_brand:string
    parent_id:string
    action:string
    name_uz:string
    click_to_upload:string
    catedory_deleted:string
    want_cate:string
    d_product:string
}
const uz:Trans = {
    cancel: 'Bekor qilish',
    products:'Mahsulotlar',
    atributs:'Atribut',
    product:'Mahsulot',
    orders:'Buyurtmalar',
    categories:'Toifalar',
    pages:'Sahifalar',
    brands:'Brendlar',
    banners:'Bannerlar',
    create_pruduct:'Mahsulot yaratish',
    create_category:'Kategoriya yaratish',
    create_brand:'Brendlar yaratish',
    name:'Nomi',
    image:"Rasm",
    price:'Narxi',
    create_a_new_product:'Yangi maxsulot yaratish',
    product_name_uz:'Mahsulot nomi uz',
    product_name_ru:'Maxsulot nomi ru',
    slug:'slug',
    description_uz:'Izoh uz',
    description_ru:'Izoh ru',
    select_category:'Kategoriyani tanlash',
    select_brand:'Brendni tanlash',
    attributes:'Atributlar',
    discount:'Chegirma',
    previos_price:'Avvalgi narx',
    quantity:'Soni',
    submit:'Tasdiqlash',
    upload:'Yuklash',
    delete:"O'chirish",
    no:"YO'Q",
    yes:'HA',
    create_a_new_category:'Yangi kategoriya yaratish',
    parent_id:'Parent',
    action:'Harakat',
    name_uz:'Nomi uz',
    click_to_upload:'Yuklash uchun bosing',
    create_a_new_brand:'Yangi brendlarni yaratish',
    catedory_deleted:'Muaffaqiyatli o`chirildi',
    want_cate:'Categoriyani o`chirib tashlamoqchimisiz?',
    d_product:'Maxsulotni o`chirib tashlamoqchimisiz?'
}
const ru:Trans = {
    cancel: 'Отмена',
    products:'Продукты',
    atributs:'Атрибут',
    product:'Продукт',
    orders:'Заказы',
    categories:'Категории',
    pages:'Страницы',
    brands:'Бренды',
    banners:'Баннеры',
    create_pruduct:'Создание продукта',
    create_category:'Создать категорию',
    create_brand:'Создать бренды',
    name:'Имя',
    image:"Рисунок",
    price:'Расходы',
    create_a_new_product:'Создать новый продукт',
    product_name_uz:'Наименование товара',
    product_name_ru:'Название продукта ru',
    slug:'слуг',
    description_uz:'Объяснение uz',
    description_ru:'Объяснение ru',
    select_category:'Выберите категорию',
    select_brand:'Выбор бренда',
    attributes:'Атрибуты',
    discount:'Скидка',
    previos_price:'Предыдущая цена',
    quantity:'Число',
    submit:'Подтверждение',
    upload:'Загрузить',
    delete:"Удалить",
    no:'НЕТ',
    yes:'ДА',
    create_a_new_category:'Создать новую категорию',
    parent_id:'Родитель',
    action:'Действие',
    name_uz:'Имя',
    click_to_upload:'Нажмите, чтобы загрузить',
    create_a_new_brand:'Создать новый бренды',
    catedory_deleted:'Удалено успешно',
    want_cate:'Вы хотите удалить категорию?',
    d_product:'Вы хотите удалить продукта?'
}
interface LanguageKeyValuePairs {
	[key: string]: Trans
}
export const languages:LanguageKeyValuePairs = {uz,ru}