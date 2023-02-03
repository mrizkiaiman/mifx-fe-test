import * as React from 'react'
import { useProducts } from '../../services/products/hooks'
import { Product } from '../../types/products'

import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import { MdAddShoppingCart } from 'react-icons/md'
import ReactStars from 'react-stars'

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
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full md:w-1/2 flex justify-center shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center w-1/2">
          <div className="relative bg-white shadow-lg mb-12 rounded-lg h-96 w-full flex items-center justify-center">
            <img
              onError={e => {
                e.currentTarget.src = imageNotFound
              }}
              className="mb-8"
              src={selectedProductData.images[productImagesIndex]}
              width={360}
              height={360}
              alt={'displayed-product'}
            />
            <div className="absolute right-2 bottom-4 flex items-center justify-center">
              <button onClick={onPrevImagePreview}>
                <IoMdArrowDropleft className="cursor mr-3 text-4xl text-gray-700" />
              </button>
              <p className="font-bold">{productImagesIndex + 1 + ' / ' + selectedProductData?.images?.length}</p>
              <button onClick={onNextImagePreview}>
                <IoMdArrowDropright className="cursor ml-3 text-4xl text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 w-full flex-wrap items-center justify-center">
            {data?.map((item, index) => (
              <button
                className={`${selectedProductIndex === index && 'ring-1 ring-green-500'} bg-white cursor-pointer w-14 h-14 rounded-lg`}
                key={item.id}
                onClick={() => onSelectImageToPreview(index)}>
                <img
                  onError={e => {
                    e.currentTarget.src = imageNotFound
                  }}
                  src={item.image}
                  width={70}
                  height={70}
                  alt={item.name}
                  className={`object-cover p-2`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-3 p-8">
          <p className="font-extrabold text-3xl text-red-500">SALE</p>
          <p className="font-bold text-xl">{selectedProductData.name}</p>
          <ReactStars value={selectedProductData.rating} edit={false} size={24} color2={'#ffd700'} />
          <p className="font-bold text-2xl">{selectedProductData.price}</p>

          <div className="h-0.5 bg-gray-200 w-full" />
          <div className="flex gap-4 w-full">
            <button className="w-1/2 flex items-center justify-center bg-yellow-400 rounded-lg p-4 gap-2">
              <MdAddShoppingCart />
              <p className="font-bold">Add to Cart</p>
            </button>
            <button className="w-1/2 flex items-center justify-center bg-green-600 rounded-lg p-4">
              <p className="font-bold text-white">Buy Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
