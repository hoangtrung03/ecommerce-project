import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SwiperCore, { Autoplay, EffectCreative, FreeMode, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import path from 'src/constants/path'

SwiperCore.use([Navigation, Autoplay, EffectCreative, FreeMode])

const Slider = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)

  const handleSlideChangeStart = useCallback(() => {
    setActiveIndex(-1)
  }, [])

  const handleSlideChangeEnd = useCallback(() => {
    setActiveIndex(swiper?.realIndex ?? 0)
  }, [swiper])

  return (
    <div className='mt-4 xsm:mt-0'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop
        modules={[Navigation, EffectCreative, Autoplay]}
        onSlideChangeTransitionStart={handleSlideChangeStart}
        onSlideChangeTransitionEnd={handleSlideChangeEnd}
        onSwiper={setSwiper}
      >
        <SwiperSlide>
          <div className='relative'>
            <img src='/assets/images/slider-home-1.jpg' alt='SmartPhone' width='1920' height='940' />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className='absolute bottom-0 left-0 right-0 top-0 hidden md:block'
            >
              <div className='flex h-full items-center justify-around'>
                <div className='text-center'>
                  <p className='fs-30 lg:text-7xl'>4K Resolution</p>
                  <h2 className='mt-2 text-4xl'>Exclusive Steel Frame</h2>
                  <Link to={path.productlist} title='Shop Now'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className='button-primary mt-5 inline-block'
                    >
                      {t('general:shopnow')}
                    </motion.div>
                  </Link>
                </div>
                <div></div>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative'>
            <img src='/assets/images/slider-home-2.jpg' alt='SmartPhone' width='1920' height='940' />
            <motion.div
              className='absolute bottom-0 left-0 right-0 top-0 hidden md:block'
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === 1 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex h-full items-center justify-around'>
                <div className='text-center text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                  <p className='fs-30 lg:text-7xl'>Curvy Bevel Dual Audio</p>
                  <h2 className='mt-2 text-4xl'>Zania Black Edition</h2>
                  <Link to={path.productlist} title='Shop Now'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className='button-primary mt-5 inline-block'
                    >
                      Shop Now
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative'>
            <img src='/assets/images/slider-home-3.jpg' alt='SmartPhone' width='1920' height='940' />
            <motion.div
              className='absolute bottom-0 left-0 right-0 top-0 hidden md:block'
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === 2 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex h-full items-center justify-around'>
                <div className='text-center text-black'>
                  <p className='fs-30 lg:text-7xl'>Delta Zertiga Processor</p>
                  <h2 className='mt-2 text-4xl'>Full Screen Display</h2>
                  <Link to={path.productlist} title='Shop Now'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className='button-primary mt-5 inline-block'
                    >
                      Shop Now
                    </motion.div>
                  </Link>
                </div>
                <div></div>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider
