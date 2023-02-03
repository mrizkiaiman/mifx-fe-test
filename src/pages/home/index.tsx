import * as React from 'react'
import { useProducts } from '../../services/products/hooks'
import { Product } from '../../types/products'

import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import { MdAddShoppingCart } from 'react-icons/md'
import ReactStars from 'react-stars'
import { ErrorPage } from '../../components/error-page'
import { PageLoader } from '../../components/page-loader'
import { motion } from 'framer-motion'

const Home = () => {
  const { data, isLoading, isError, error } = useProducts()
  const [selectedProductIndex, setSelectedProductIndex] = React.useState<number>(0)

  const imageNotFound = 'assets/placeholder-no-photo.webp'
  const dataNotFound: Product = {
    id: '100',
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

  if (isError) return <ErrorPage message={error.message} />
  //The loading will be rendered twice in dev environment since CRA is using React.StrictMode by default, you can remove it from index.tsx
  return isLoading ? (
    <PageLoader />
  ) : (
    <div className="w-screen lg:h-screen flex justify-center items-center">
      <div className="w-full lg:w-3/4 flex flex-col lg:flex-row justify-center shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center lg:w-1/2">
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
          <div className="flex gap-4 w-80 md:w-full flex-wrap items-center justify-center">
            {data?.map((item, index) => (
              <motion.button whileHover={{ scale: 1.2 }} key={item.id}>
                <button
                  className={`${
                    selectedProductIndex === index && 'ring-4 ring-teal-500'
                  } bg-white cursor-pointer w-16 h-16 rounded-lg transition ease-in-out duration-150`}
                  onClick={() => onSelectImageToPreview(index)}>
                  <img
                    onError={e => {
                      e.currentTarget.src = imageNotFound
                    }}
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.name}
                    className={`object-cover p-2`}
                  />
                </button>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-3 p-2 lg:p-8">
          <p className="font-extrabold text-3xl text-red-500 tracking-tighter">SALE</p>
          <p className="font-bold text-xl">{selectedProductData.name}</p>
          <ReactStars value={selectedProductData.rating} edit={false} size={24} color2={'#ffd700'} />
          <p className="font-extrabold text-2xl">{selectedProductData.price}</p>

          <div className="h-0.5 bg-gray-200 w-full" />
          <div className="flex gap-5 w-full">
            <button className="w-1/2 flex items-center justify-center bg-yellow-400 rounded-lg p-4 gap-2 transition ease-in-out hover:scale-105 hover:bg-teal-700 hover:text-white duration-150">
              <MdAddShoppingCart />
              <p className="font-bold">Add to Cart</p>
            </button>
            <button className="w-1/2 flex items-center justify-center bg-emerald-600 rounded-lg p-4 transition ease-in-out hover:scale-105 hover:bg-red-700 hover:text-white duration-150">
              <p className="font-bold text-white">Buy Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
