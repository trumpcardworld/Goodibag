import React from 'react';
import Link from 'next/link';
import logo from "@assets/img/logo/logo.png";
import RegisterForm from '@/forms/register-form';

const RegisterPage = () => {
  return (
    <div className="tp-main-wrapper h-screen">
      <div className="container mx-auto my-auto h-full flex items-center justify-center">
        <div className="pt-[120px] pb-[120px]">
          <div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md ">
            <div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
              <div className="data-bg absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat" data-bg="assets/img/bg/login-bg.jpg" style={{backgroundImage:`url(${logo.src})`}}></div>
            </div>
            <div className="col-span-12 lg:col-span-6 md:w-[500px] mx-auto my-auto  pt-[20px] py-[45px] px-5 md:px-[60px]">
              <div className="text-center">
                <h4 className="text-[24px] mb-1">Register Now.</h4>
                <p>Already have an account?  <span> 
                  <Link href="/login" className="text-theme">Sign In</Link> </span>
                </p>
              </div>
              <div className="">
                <RegisterForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;