import { Meeting } from "@prisma/client";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { FaCheck, FaGoogle } from "react-icons/fa";

import PublicLayout from "@components/PublicLayout";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BookingSuccessProps {
  meeting: string;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ meeting }) => {
  const meet = JSON.parse(meeting) as Meeting;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    Router.push("/auth/sign-up?e=" + email);
  };

  return (
    <PublicLayout title="Confirmation">
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
                15 Min Meeting between Daniel Tonel and {meet.attendee_name}
              </div>
            </div>
            <div className="flex text-sm">
              <div className="w-4/12 font-semibold">
                <p>When</p>
              </div>
              <div className="w-11/12 font-medium text-gray-700">
                {moment(meet.time).format("MMMM Do, YYYY")} <br />
                {moment(meet.time).format("h:mm a")} - 15 mins
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
            <form onSubmit={handleSubmit}>
              <div className="flex my-4">
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={meet.attendee_email}
                  className="w-8/12 px-3 py-2 font-medium border outline-0 md:w-9/12"
                />
                <button
                  type="submit"
                  className="w-6/12 p-2 text-xs font-semibold text-white bg-black whitespace-nowrap md:text-sm md:w-3/12">
                  Try it for free
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const meeting = await prisma?.meeting.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!meeting) {
    return {
      redirect: {
        destination: "/booking",
        permanent: false,
      },
    };
  }

  return {
    props: {
      meeting: JSON.stringify(meeting),
    },
  };
};

export default BookingSuccess;
