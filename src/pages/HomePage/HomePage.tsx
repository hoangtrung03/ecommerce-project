import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Slider from 'src/components/Slider'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import { Navigation,Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

export default function HomePage() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
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
      <Slider />
      <div className='container'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className='mySwiper'
          loop
        >
          {productsData?.data.data.products.splice(0, 12).map((item) => (
            <Fragment key={item._id}>
              <SwiperSlide>
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
              </SwiperSlide>
            </Fragment>
          ))}
        </Swiper>
      </div>
    </>
  )
}
