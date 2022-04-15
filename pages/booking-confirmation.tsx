import Image from "next/image";
import React from "react";
import { FaCalendar, FaClock, FaPlus } from "react-icons/fa";

import AppLayout from "@components/AppLayout";
import ButtonLoader from "@components/ui/Button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BookingConfirmationProps {}

const BookingConfirmation: React.FC<BookingConfirmationProps> = () => {
  return (
    <AppLayout title="Confirmation">
      <div className="flex min-h-screen">
        <div className="w-11/12 max-w-5xl p-8 m-auto bg-white border content-div lg:flex md:w-8/12 lg:w-11/12">
          <div className="w-full lg:w-5/12">
            <Image
              src="/assets/images/earth.png"
              width={30}
              height={30}
              className="w-24 h-24 text-xs bg-white"
              alt=""
            />
            <div className="my-4">
              <div className="font-semibold text-gray-400 capitalize"> daniel tonel</div>
              <div className="text-3xl font-semibold capitalize">15 min meeting</div>
              <div className="flex items-center mt-4 text-gray-500">
                <i className="mr-2 fa-solid fa-clock"></i>
                <FaClock />
                <span className="text-lg">15 Minutes</span>
              </div>
              <div className="flex items-center mt-4 text-green-500">
                <FaCalendar />
                <span className="text-lg">4:30pm</span>
              </div>
            </div>
          </div>
          <div className="my-6 border lg:my-0 lg:mx-6"></div>
          <div className="w-full lg:w-7/12 ">
            <form action="" className="">
              <div className="mb-6">
                <label htmlFor="email" className="font-semibold">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              <button className="mb-6 font-semibold">
                <FaPlus />
                <span className="font-semibold capitalize">additional guests</span>
              </button>
              <div className="mb-6">
                <label htmlFor="email" className="font-semibold">
                  Email address
                </label>
                <textarea
                  name=""
                  placeholder="Please share anything that will help prepare for our meeting."
                  className="w-full p-4 border"
                  id=""
                  cols={3}
                  rows={3}></textarea>
              </div>
              <div className="flex">
                <div className="w-[120px] mr-10">
                  <ButtonLoader type="button" value="Confirm" />
                </div>
                <div className="w-[120px]">
                  <ButtonLoader type="button" value="Cancel" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingConfirmation;
