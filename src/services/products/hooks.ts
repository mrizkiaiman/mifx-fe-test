import { useQuery } from '@tanstack/react-query'
import { getProducts } from './api'
import { productKeys } from '../queryKeys'
import { AxiosError } from 'axios'
import { APIResponse } from '../../types'

import { Product } from '../../types/products'

export const useProducts = () => {
  return useQuery<APIResponse<Product>, AxiosError>(productKeys.all, () => getProducts())
}
