export interface Product {
  _id: string,
  title: string,
  description: string,
  urlPicture: string,
  sold: number,
  quantity?: number,
  price: number,
  discountPercent: number,
  colors: [],
  sizes: [],
  ratingAverage: number,
  ratingQuantity: number,
  pin?: {},
  screen?: {},
  configuration?: {},
  connection?: {},
  otherInfo?: {},
  category?: string
}

export interface ProductParams {
  limit?: number,
  page?: number,
  category?: string,
  'ratingAverage[gte]'?: string,
  sort?: string,
  'colors%27color'?: string
}