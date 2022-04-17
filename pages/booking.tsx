import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers";
import AppContext from "@store/index";
import { isPast } from "date-fns";
import Image from "next/image";
import Router from "next/router";
import React, { useContext } from "react";
import { FaClock } from "react-icons/fa";

import PublicLayout from "@components/PublicLayout";

const Booking: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { state, dispatch } = useContext(AppContext);

  const confirmBooking = () => {
    const data = {
      date: value as Date,
    };

    dispatch({
      type: "SET_DATA",
      payload: data,
    });

    Router.push("/booking-confirmation");
  };

  return (
    <PublicLayout title="Booking">
      <div className="flex min-h-screen">
        <div className="max-w-5xl p-8 m-auto bg-white border-2 border-gray-300 content-div lg:flex md:w-8/12 lg:w-11/12">
          <div className="w-full lg:w-5/12">
            <Image
              src="/assets/images/planet-earth.jpg"
              width={30}
              height={30}
              className="w-24 h-24 text-xs bg-white"
              alt=""
            />
            <div className="my-4">
              <div className="font-semibold text-gray-400 capitalize"> daniel tonel</div>
              <div className="text-3xl font-semibold capitalize">15 min meeting</div>
              <div className="flex items-center mt-4 text-gray-500">
                <FaClock />
                <span className="text-lg">15 Minutes</span>
              </div>
            </div>
          </div>
          <div className="border md:my-6 lg:my-0 lg:mx-6"></div>
          <div className="flex items-center justify-center w-full lg:w-7/12">
            <div className="w-fit">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker<Date>
                  openTo="day"
                  value={value}
                  shouldDisableDate={isPast}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  onClose={() => confirmBooking()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Booking;
