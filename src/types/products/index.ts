export interface Product {
  id: string
  image: string
  images: Array<string>
  name: string
  price: string
  off: string
  rating: number
  new: boolean
  isFav: boolean
  out_of_stock: boolean
  reviewCount: number
  sizes: Array<number>
  description: string
}
