import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-warm-beige p-4'>
        <AuthForm type="sign-up"/>
    </div>
  )
}

export default page
