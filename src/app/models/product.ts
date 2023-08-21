export interface Product {
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