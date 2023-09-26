import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react"
import { authApi } from '@/server/api/auth/auth';
import { Message } from '@/components/toast';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { Loading } from '@/components/loading';
const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isLoading, setisloading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/homepage";
  const { status } = useSession();


  useEffect(() => {
    if (status == "authenticated") {
      router.push("/homepage");
    }
  })

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value.trim();

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));

  }

  const submitForm = async (e: any) => {
    setisloading(true);
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username: formData['username'],
      password: formData['password'],
      callbackUrl: callbackUrl,
    }).then((resp) => {
      if (resp?.ok) {
        router.push("/homepage");
      } else {
        Message(resp?.error, resp?.status);
      }
    }).catch((error) => {
      console.log("error")
      console.log(error)
    });
    setisloading(false);
  }

  return (

    <div className=" w-50 fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <form className="w-full" onSubmit={submitForm} method='POST'>
        <div className='row mb-3'>
          <h1>Home App</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">User Name</label>
          <input type="text" className="form-control" id="emailInput" name="username" placeholder="Enter user name" onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Enter password" onChange={handleInput} />
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
          </div>
          <div className='col-6 flex justify-content-end'>
            <a href=''>Forgot Password</a>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary mb-3">Sign In</button>
        </div>
        <Loading enabled={isLoading}></Loading>
      </form>
    </div>

  )
}
