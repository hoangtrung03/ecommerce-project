import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <h1 className='text-center text-5xl font-bold text-primary-377DFF'>Sign In</h1>
      <p className='mt-2 mb-7 text-center text-sm font-medium text-gray-500'>Welcome back, you&apos;ve been missed!</p>
      <div className='b-sd rounded-8 p-6 md:p-10'>
        <div className='flex flex-col justify-between gap-5 md:flex-row'>
          <button className='flex h-12 items-center justify-center rounded-8 bg-gray-200 px-10 duration-200 hover:bg-gray-300'>
            <span className='text-gray text-base font-medium'>Log in with Google</span>
          </button>
          <button className='flex h-12 items-center justify-center rounded-8 bg-gray-200 px-10 duration-200 hover:bg-gray-300'>
            <span className='text-gray text-base font-medium'>Log in with Apple</span>
          </button>
        </div>
        <div className='my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300'>
          <p className='mx-4 mb-0 text-center font-semibold'>Or</p>
        </div>
        <form>
          <div className='relative my-2'>
            <input type='email' className='h-12 w-full rounded-lg border px-10' placeholder='Input Email' />
          </div>
          <div className='relative my-5'>
            <input className='h-12 w-full rounded-lg border px-10' placeholder='Input Password' />
          </div>
          <div className='flex flex-col items-center justify-between lg:flex-row'>
            <div className='flex cursor-pointer items-center gap-2'>
              <input type='checkbox' className='rounded-lg border ' />
              <p className='font-medium text-gray-500'>Remember me</p>
            </div>
            <p className='cursor-pointer font-medium text-gray-500'>Forgot Password?</p>
          </div>
          <button
            type='submit'
            className='mt-5 h-12 w-full rounded-8 bg-primary-377DFF font-medium text-white duration-200 hover:bg-secondary-1D6AF9'
          >
            Sign In
          </button>
        </form>
        <Link to='/register' className='mt-5 flex items-center justify-center text-base font-medium'>
          <span className='text-gray'>You haven&apos;t any account?</span>
          <span className='ml-2 text-primary-377DFF hover:text-secondary-1D6AF9'>Sign Up</span>
        </Link>
      </div>
    </>
  )
}