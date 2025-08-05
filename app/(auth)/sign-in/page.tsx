import AuthForm from '@/components/AuthForm'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-warm-beige p-4'>
        <AuthForm type="sign-in"/>
      
    </div>
  )
}

export default page;
