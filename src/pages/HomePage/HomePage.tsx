import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Helmet } from 'react-helmet-async'
import productApi from 'src/apis/product.api'
import Product from 'src/components/Product'
import Slider from 'src/components/Slider'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

import 'swiper/swiper-bundle.min.css'

export default function HomePage() {
  const { t } = useTranslation()
  const queryConfig = useQueryConfig()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   },
  //   staleTime: 3 * 60 * 1000
  // })
  // console.log(productsData)

  return (
    <>
      <Helmet>
        <title>Home | Lotso Shop</title>
        <meta
          name='description'
          content="Welcome to Lotso Shop, your one-stop destination for online shopping! Our user-friendly homepage makes it easy to browse our vast selection of products and find exactly what you're looking for. From electronics to fashion, we offer a wide range of high-quality products at competitive prices. Plus, with our secure checkout process and fast shipping, you can shop with confidence and convenience. Visit our homepage now to start exploring and discover the best deals and discounts."
        />
      </Helmet>
      <Slider />
      <div className='container mt-10'>
        <h2 className='fs-18 mt-5 font-bold text-primary-377DFF lg:fs-30 lg:mt-10'>{t('header.new-products')}</h2>
        <div className='relative'>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current
            }}
            modules={[Navigation, Pagination]}
            className='new-product-slider'
            loop
            breakpoints={{
              1200: {
                slidesPerView: 4
              },
              768: {
                slidesPerView: 3
              },
              0: {
                slidesPerView: 2
              }
            }}
          >
            {productsData?.data.data.products.splice(0, 12).map((item) => (
              <SwiperSlide key={item._id}>
                <div className='p-2 lg:p-6'>
                  <Product product={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            ref={navigationPrevRef}
            className='b-sd-1 absolute left-0 top-1/2 z-10 hidden cursor-pointer rounded-full border border-secondary-26B374 bg-white fill-secondary-26B374 p-3 duration-200 hover:bg-secondary-26B374 hover:fill-white md:block'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z'></path>
            </svg>
          </div>
          <div
            ref={navigationNextRef}
            className='b-sd-1 absolute right-0 top-1/2 z-10 hidden cursor-pointer rounded-full border border-secondary-26B374 bg-white fill-secondary-26B374 p-3 duration-200 hover:bg-secondary-26B374 hover:fill-white md:block'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z'></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
