import Image from "next/image";
import React from "react";
import { FaCheck, FaGoogle } from "react-icons/fa";

import AppLayout from "@components/AppLayout";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BookingSuccessProps {}

const BookingSuccess: React.FC<BookingSuccessProps> = () => {
  return (
    <AppLayout title="Confirmation">
      <div className="flex min-h-screen">
        <div className="w-full p-8 m-auto content-login-div md:w-8/12 md:px-8 lg:px-10 lg:w-7/12">
          <div className="p-10 bg-white border max-w-[750px] m-auto">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="icon-div">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-200 rounded-circular">
                    <i className="text-green-500">
                      <FaCheck />
                    </i>
                  </div>
                </div>
              </div>
              <div className="my-3 text-2xl font-semibold">
                <div className="meeting-text">This meeting is scheduled</div>
              </div>
              <div className="text-sm font-medium text-center text-slate-700">
                <p>We emailed you and the other attendees a calender invitation will all the details.</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex pb-3 text-sm">
              <div className="w-4/12 font-semibold">
                <p>What</p>
              </div>
              <div className="w-11/12 font-medium text-gray-700">
                15 Min Meeting between Daniel Tonel and Test
              </div>
            </div>
            <div className="flex text-sm">
              <div className="w-4/12 font-semibold">
                <p>When</p>
              </div>
              <div className="w-11/12 font-medium text-gray-700">
                Wednesday, 29 December 2021 <br />
                4:30pm - 15 mins
                <span className="text-slate-500">(Europe/Vienna)</span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex items-center mt-4">
              <div className="w-4/12 text-xs font-semibold md:text-sm">
                <p>Add to Calender</p>
              </div>
              <div className="flex justify-between w-8/12 text-right">
                <div className="flex items-center justify-center w-10 h-10 m-auto text-xs border md:text-sm">
                  <FaGoogle />
                </div>
                <div className="flex items-center justify-center w-10 h-10 m-auto mx-3 text-xs border md:text-sm">
                  <Image src="/assets/images/font-icon/outlook.png" width={20} height={20} alt="" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 m-auto text-xs border md:text-sm">
                  <Image src="/assets/images/font-icon/office.png" width={20} height={20} alt="" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 m-auto mx-3 text-xs border md:text-sm">
                  <Image src="/assets/images/font-icon/ics-file.png" width={20} height={20} alt="" />
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="text-xs text-center text-gray-400">
              <p>Create your own booking link with cal.com</p>
            </div>
            <form action="">
              <div className="flex my-4">
                <input
                  type="text"
                  name="username"
                  placeholder="asdf@asdf.asdf"
                  className="w-8/12 px-3 py-2 font-medium border outline-0 md:w-9/12"
                />
                <button className="w-6/12 p-2 text-xs font-semibold text-white bg-black whitespace-nowrap md:text-sm md:w-3/12">
                  {" "}
                  Try it for free{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingSuccess;
