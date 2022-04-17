import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { error } from "@helpers/toast";

import PublicLayout from "@components/PublicLayout";
import ButtonLoader from "@components/ui/Button";

const Login: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/";

  // const { state, dispatch } = useContext(AppContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const response = await signIn<"credentials">("credentials", {
      ...input,
      redirect: false,
      callbackUrl,
    });

    if (response?.error) {
      error("Login failed, check your credentials and try again");
    }

    if (!response?.error) {
      window.location.replace(callbackUrl);
    }
    setIsLoading(false);
  };

  return (
    <PublicLayout title="Login">
      <div className="flex min-h-screen">
        <div className="max-w-2xl p-5 m-auto w-12/12 content-login-div md:w-8/12 md:px-16 lg:px-20 lg:w-8/12">
          <section className="COMPANY-NAME">
            <div className="mb-4 text-2xl font-medium text-center">Cal.com</div>
            <div className="mb-4 font-semibold text-center text-1xl md:text-3xl">Sign in to your account</div>
          </section>
          <section className="w-full p-8 bg-white border rounded lg:w-full">
            <div className="form-section">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="font-semibold">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 font-semibold border"
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="font-semibold">
                      Password
                    </label>
                    <div>
                      <a href="#" className="font-semibold">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 font-semibold border"
                  />
                </div>
                <div className="login-btn">
                  <ButtonLoader value="Sign in" isLoading={isLoading} type="submit" />
                </div>
              </form>
            </div>
          </section>
          <section>
            <div className="flex justify-center py-4 font-medium text-md item-center">
              <span className="mr-2 text-gray-500"> Dont have an account?</span>
              <Link href="/auth/sign-up">
                <a className="font-semibold text-black">Create an account</a>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
