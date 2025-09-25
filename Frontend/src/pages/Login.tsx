import Navbar from '@/components/Navbar'
import React from 'react'
import Footer from '@/components/Footer'
import signBg from '@/assets/signbg.png'
import LoginForm from '@/components/LoginForm'

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 "
        style={{ backgroundImage: `url(${signBg})` }}
      />
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-sage-lighter/20 via-mint/10 to-background/80 -z-10" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Login;