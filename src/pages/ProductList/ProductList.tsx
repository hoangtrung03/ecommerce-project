import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import useQueryConfig from 'src/hooks/useQueryConfig'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='container mx-auto mt-7 flex flex-col items-center justify-center'>
      {productsData && (
        <div className='grid grid-cols-1 gap-5 mmd:grid-cols-12 lg:gap-6'>
          <div className='mmd:col-span-3'>
            <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
          </div>
          <div className='mmd:col-span-9'>
            <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            <div className='mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
              {productsData.data.data.products.map((product) => (
                <Fragment key={product._id}>
                  <Product product={product} />
                </Fragment>
              ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
          </div>
        </div>
      )}
    </div>
  )
}
