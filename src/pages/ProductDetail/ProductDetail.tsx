import { Fragment, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { calculateRateSale, formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
// import QuantityController from 'src/components/QuantityController'
import DOMPurify from 'dompurify'
import { Product } from 'src/types/product.type'

export default function ProductDetail() {
  const { id } = useParams()
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  //set product detail data when call api
  const productDetail = ProductDetailData?.data.data

  //handle current image
  const currentImages = useMemo(
    () => (productDetail ? productDetail.images.slice(...currentIndexImages) : []),
    [productDetail, currentIndexImages]
  )

  //handle active image
  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])

  const next = () => {
    if (currentIndexImages[1] < (productDetail as Product)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  if (!productDetail) return null
  return (
    <Fragment>
      <div className='py-4 lg:py-6'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-6 rounded-16 border bg-FAFAFD p-4 md:grid-cols-12 md:gap-8 lg:p-6'>
            <div className='md:col-span-5'>
              <div className='b-sd-1 relative w-full cursor-zoom-in overflow-hidden rounded-10 pt-[100%]'>
                <img
                  src={activeImage}
                  alt={productDetail.name}
                  title={productDetail.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-2 md:gap-3 lg:mt-6'>
                <button className='absolute -left-4 top-1/2 h-6 w-6 -translate-y-1/2 bg-transparent md:-left-6'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' onClick={prev} />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='z-1 relative w-full overflow-hidden rounded-8 pt-[100%]'
                      key={img}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={productDetail.name}
                        title=''
                        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 rounded-8 border border-primary-377DFF'></div>}
                    </div>
                  )
                })}

                <button
                  className='absolute -right-4 top-1/2 h-6 w-6 -translate-y-1/2 bg-transparent md:-right-6'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='md:col-span-7'>
              <h1 className='fs-18 font-semibold uppercase lg:fs-20'>{productDetail.name}</h1>
              <div className='mt-2 flex items-center gap-2 lg:mt-4 lg:gap-4'>
                <div className='flex items-center gap-1'>
                  <span className='fs-14 mr-1 border-b border-b-primary-377DFF border-b-primary-377DFF font-semibold text-primary-377DFF'>
                    {productDetail.rating}
                  </span>
                  <ProductRating rating={productDetail.rating} />
                </div>
                <div className='h-4 border-r-[1px] border-r-primary-377DFF'></div>
                <p className='fs-14 font-semibold text-primary-377DFF'>
                  <span>{formatNumberToSocialStyle(productDetail.sold)}</span>
                  <span className='ml-1'>sold</span>
                </p>
              </div>
              <div className='mt-3 flex max-w-max items-center rounded-10 border bg-white p-2 lg:mt-6'>
                <p className='fs-14 max-w-[50%] truncate text-red-600 line-through xsm:fs-16'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price_before_discount)}</span>
                </p>
                <p className='fs-14 ml-2 max-w-[50%] truncate xsm:fs-16'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price)}</span>
                </p>
                <p className='fs-12 ml-4 rounded-8 p-2 font-semibold xsm:fs-14'>
                  -{calculateRateSale(productDetail.price_before_discount, productDetail.price)}
                </p>
              </div>
              <div className='xsx:flex-nowrap xsx:gap-5 mt-4 flex flex-wrap items-center gap-4 lg:mt-8'>
                <p className='fs-14 whitespace-nowrap capitalize md:fs-16'>Quantity</p>
                {/* <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onTyping={handleBuyCount}
                  value={buyCount}
                  max={productDetail.quantity}
                /> */}
                <p className='fs-14 whitespace-nowrap'>{productDetail.quantity} In Stock</p>
              </div>
              <div className='xsx:flex-nowrap xsx:justify-end mt-4 flex flex-wrap items-end justify-start gap-4 lg:mt-8 lg:gap-5'>
                <button className='xsx:max-w-max button-primary h-10 whitespace-nowrap  rounded-8 px-4'>
                  Add to cart
                </button>
                <button className='xsx:max-w-max button-secondary h-10 whitespace-nowrap rounded-8 px-4'>
                  Purchase
                </button>
              </div>
            </div>
          </div>
          <div className='mt-3 rounded-16 border bg-FAFAFD p-4 lg:mt-6 lg:p-6'>
            <h2 className='fs-18 mb-2 font-semibold uppercase lg:fs-20 lg:mb-4'>Product description</h2>
            <div className='dcs-product fs-14 lg:fs-16'>
              <div className=' col-span-1 overflow-hidden '>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productDetail.description)
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mt-3 rounded-16 border bg-white p-4 lg:mt-6 lg:p-6'>
            <p className='fs-18 font-semibold uppercase lg:fs-20'></p>
            <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-6 lg:gap-6'></div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}