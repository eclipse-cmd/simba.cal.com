import axios from "axios";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import * as toast from "@helpers/toast";

import PublicLayout from "@components/PublicLayout";
import ButtonLoader from "@components/ui/Button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const SignUp: React.FC = () => {
  const router = useRouter();
  const email = useMemo<string>(() => router.query.e as string, [router.query.e]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const data = input;
    if (input.email.length > 0) {
      data.email = input.email;
    }

    //check password
    if (input.password.length < 10) {
      toast.error("Password must have a mininmum of 10 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", data);
      toast.success(response.data.message);
      setTimeout(() => router.push("/auth/login"), 5000);
    } catch (error: any) {
      const message = error?.response.data.message ?? "Sign up failed, pleast try again";
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <PublicLayout title="Sign up">
      <div className="flex min-h-screen bg-white">
        <div className="m-auto w-12/12 md:w-10/12 lg:w-10/12 xl:w-8/12">
          <div className="block lg:flex lg:p-8">
            <section className="p-8 lg:w-6/12">
              <div className="mb-4 text-2xl font-medium text-left">Cal.com</div>
              <div className="simpler-text">
                <div className="max-w-md text-3xl font-bold opacity-90 lg:text-6xl">
                  You are one step away from simpler scheduling.
                </div>
              </div>
              <div className="my-4">
                <div className="text-quote">
                  <q className="max-w-md text-sm text-slate-500">
                    I love being able to use a tool that just works, and that is open source. As a developer,
                    I love being empowered to contribute to a tool that I use regularly
                  </q>
                </div>
              </div>
              <div className="comment-made-by">
                <a href="">
                  <div className="flex">
                    {/* <Image src="/assets/images/1.jfif" layout="fill" className="w-10 h-10 mr-2 rounded-full md:mr-2" alt="" /> */}
                    <div className="user-handler">
                      <div className="text-sm font-bold capitalize">
                        cassidy williams <span className="text-xs text-blue-400">@cassdoo</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        <div className="bio">Director of Developer Experience at Netlify</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </section>
            <section className="m-8 lg:w-6/12 lg:m-0 lg:p-0">
              <div className="border rounded ml-lg-12">
                <div className="p-6">
                  <div className="text-xl font-bold lg:text-3xl">
                    <div className="form-headline">Start your 14-day free trial</div>
                  </div>
                  <div className="text-xs md:text-sm">
                    <div className="text-slate-400">
                      <span className="font-bold"> No credit card required. </span>
                      <span>Try all pro features fo 14 days.</span> <br />
                      <span>Upgrade at any time to Pro for $12/month</span>
                    </div>
                    <div className="mt-6">
                      <div className="relative my-4">
                        <div
                          id="icon-down"
                          className="absolute left-0 right-0 top-[-20px] bottom-auto flex items-center justify-center w-10 h-10 m-auto bg-white rounded-circular">
                          <FaAngleDown />
                        </div>
                        <div className="border"></div>
                      </div>
                    </div>
                    <div className="form-section">
                      <form onSubmit={handleSubmit} className="my-6">
                        <div className="flex">
                          <label htmlFor="Username" className="sr-only">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-6/12 px-2 py-2 text-sm font-medium border md:w-2/12"
                            placeholder="cal.com/"
                            disabled
                          />
                          <input
                            type="text"
                            name="name"
                            required
                            onChange={handleChange}
                            id="name"
                            placeholder="John Doe"
                            className="w-full px-3 py-2 font-medium border border-l-0 md:w-10/12"
                          />
                        </div>
                        <div className="my-6">
                          <label htmlFor="email" className="sr-only">
                            email
                          </label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder={email ?? "Email address"}
                            className="w-full px-3 py-2 font-medium border"
                          />
                        </div>
                        <div className="mb-6">
                          <label htmlFor="password" className="sr-only">
                            password
                          </label>
                          <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full px-3 py-2 font-medium border"
                          />
                        </div>
                        <div>
                          <ButtonLoader value="Sign up for free" isLoading={isLoading} type="submit" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-5 text-sm bg-gray-100 border-t">
                  <div className="policy">
                    <span className="text-gray-600">
                      By signing up, you agree to our
                      <a href="#" className="font-semibold text-black">
                        {" "}
                        Terms of Service
                      </a>{" "}
                      and
                      <a href="#" className="font-semibold text-black">
                        {" "}
                        privacy policy.
                      </a>
                    </span>
                    <br />
                    <div className="py-2">
                      <span className="text-gray-600 ">Need help?</span>
                      <a href="#" className="font-semibold text-black">
                        {" "}
                        Get in touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SignUp;
