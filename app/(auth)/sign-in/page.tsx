//auth/sign-in
import AuthForm from '@/components/AuthForm'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-warm-beige p-4'>
        <AuthForm key="sign-in" type="sign-in"/>
      
    </div>
  )
}

export default page;
