export const slugify = (text: string) =>
	text
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')

export const postData = (obj: any, n = []) => {
	let newObj: any = structuredClone(obj)
	for (let el in newObj) {
		if (n.includes(el as never)) {
			delete newObj[el]
		}
	}
	return newObj
}

export const shortTitle = (title: string) => {
	return title.length > 20 ? title.slice(0, 20) + '...' : title
}

export enum LangEnums {
	UZ = 'uz',
	RU = 'ru',
}
