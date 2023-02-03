import * as React from 'react'

interface ErrorPageProps {
  message: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="assets/error-illustration.webp" width={450} height={450} alt="error-illustration" />
        <p className="font-extrabold text-xl mt-8 text-center">{message}</p>
      </div>
    </>
  )
}

export default ErrorPage
