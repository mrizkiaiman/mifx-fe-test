import { GET } from '../http'
import { Product } from '../../types/products'
import { APIResponse } from '../../types'

import { config } from '../../config'

export const getProducts = (): Promise<APIResponse<Product>> => {
  return GET(`${config.apiURL}/products`)
}
