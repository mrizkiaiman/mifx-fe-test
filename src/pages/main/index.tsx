import * as React from 'react'
import { useProducts } from '../../services/products/hooks'
import { Product } from '../../types/products'

import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'

const Main = () => {
  const { data, isLoading } = useProducts()
  const [selectedProductIndex, setSelectedProductIndex] = React.useState<number>(0)

  const imageNotFound = 'assets/placeholder-no-photo.webp'
  const dataNotFound: Product = {
    id: '7',
    image: imageNotFound,
    images: [imageNotFound],
    name: 'Not found',
    price: '-',
    off: '',
    rating: 0,
    new: false,
    isFav: false,
    out_of_stock: true,
    reviewCount: 0,
    sizes: [],
    description: 'Product not found',
  }
  const selectedProductData: Product = data?.[selectedProductIndex] || dataNotFound

  const [productImagesIndex, setProductImagesIndex] = React.useState<number>(0)
  const onPrevImagePreview = () => {
    if (productImagesIndex > 0) setProductImagesIndex(productImagesIndex - 1)
  }
  const onNextImagePreview = () => {
    if (productImagesIndex + 1 < selectedProductData?.images?.length) setProductImagesIndex(productImagesIndex + 1)
  }
  const onSelectImageToPreview = (index: number) => {
    setSelectedProductIndex(index)
    setProductImagesIndex(0)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-cente">
      <div className="w-3/4 md:w-1/2 flex justify-center items-center ">
        <div className="flex flex-col items-center w-3/4 bg-red-500">
          <div className="relative">
            <img
              onError={e => {
                e.currentTarget.src = imageNotFound
              }}
              src={selectedProductData.images[productImagesIndex]}
              width={200}
              height={200}
              alt={'displayed-product'}
            />
            <div className="absolute right-0 bottom-0 flex items-center justify-center">
              <button onClick={onPrevImagePreview}>
                <IoMdArrowDropleft className="cursor mr-3 text-2xl text-gray-700" />
              </button>
              <p>{productImagesIndex + 1 + ' / ' + selectedProductData?.images?.length}</p>
              <button onClick={onNextImagePreview}>
                <IoMdArrowDropright className="cursor ml-3 text-2xl text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 w-3/4 flex-wrap items-center justify-center">
            {data?.map((item, index) => (
              <button key={item.id} onClick={() => onSelectImageToPreview(index)}>
                <img
                  onError={e => {
                    e.currentTarget.src = imageNotFound
                  }}
                  src={item.image}
                  width={70}
                  height={70}
                  alt={item.name}
                  className={`bg-white cursor-pointer object-cover p-2 ${selectedProductIndex === index && 'ring-1 ring-white'} rounded-lg`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="w-1/4 bg-slate-800">
          <p>asd</p>
        </div>
      </div>
    </div>
  )
}

export default Main
