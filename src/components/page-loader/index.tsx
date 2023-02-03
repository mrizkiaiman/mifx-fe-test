import * as React from 'react'
import Loader from './assets/loader-pochita.json'
import LottieLoader from 'react-lottie-loader'

export const PageLoader = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="w-96 h-96">
      <LottieLoader animationData={Loader} />
    </div>
  </div>
)

export default PageLoader
