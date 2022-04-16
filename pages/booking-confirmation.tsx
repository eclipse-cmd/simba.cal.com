import AppContext from "@store/index";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Router from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaCalendar, FaPlus } from "react-icons/fa";

import * as toast from "@helpers/toast";

import AppLayout from "@components/AppLayout";
import ButtonLoader from "@components/ui/Button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BookingConfirmationProps {}

const BookingConfirmation: React.FC<BookingConfirmationProps> = () => {
  const { state } = useContext(AppContext);
  const date = useMemo<Date | null>(() => state.data.date, [state.data.date]);
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guest, setGuest] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post("/api/meeting", {
        ...input,
        date,
      });
      toast.success("new meeting created");
      Router.push("/booking-success/" + response.data.id);
    } catch (error: any) {
      const msg = error.response.data.message;
      toast.error(msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!date) {
      toast.error("Date not set, you cannot confirm your meeting, please try again");
      setTimeout(() => Router.push("/booking"), 2000);
      return;
    }
  }, [date]);

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
              {date && (
                <div className="flex items-center mt-4 text-green-500">
                  <FaCalendar />
                  <span className="ml-2 text-lg text-black">
                    {moment(new Date(date).toString()).format("h:mm a, MMMM Do, YYYY")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="my-6 border lg:my-0 lg:mx-6"></div>
          <div className="w-full lg:w-7/12 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="font-semibold">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              {!guest && (
                <button className="mb-6 font-semibold" type="button" onClick={() => setGuest(true)}>
                  <span className="flex items-center justify-start font-semibold capitalize">
                    <FaPlus className="mr-2" /> additional guests
                  </span>
                </button>
              )}
              {guest && (
                <div className="mb-6">
                  <label htmlFor="email" className="font-semibold">
                    Guest
                  </label>
                  <input
                    type="email"
                    name="guest"
                    onChange={handleChange}
                    placeholder="guest@example.com"
                    className="w-full px-3 py-2 mt-1 border"
                  />
                </div>
              )}
              <div className="mb-6">
                <label htmlFor="email" className="mb-6 font-semibold">
                  Additional notes
                </label>
                <textarea
                  name="notes"
                  onChange={handleChange}
                  placeholder="Please share anything that will help prepare for our meeting."
                  className="w-full p-4 border"
                  id=""
                  required
                  cols={3}
                  rows={3}></textarea>
              </div>
              <div className="flex">
                <div className="w-[120px] mr-10">
                  <ButtonLoader type="submit" isLoading={isLoading} value="Confirm" />
                </div>
                <div className="w-[120px]">
                  <ButtonLoader type="button" value="Cancel" clickFunction={() => Router.push("/booking")} />
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
