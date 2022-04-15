import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import Image from "next/image";
import React from "react";
import { FaClock, FaCalendar } from "react-icons/fa";

import AppLayout from "@components/AppLayout";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BookingProps {}

const Booking: React.FC<BookingProps> = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <AppLayout title="Booking">
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
              <div className="flex items-center mt-4 text-green-500">
                <FaCalendar />
                <span className="text-lg">4:30pm</span>
              </div>
            </div>
          </div>
          <div className="border md:my-6 lg:my-0 lg:mx-6"></div>
          <div className="w-full lg:w-7/12 ">
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker<Date>
                  orientation="landscape"
                  openTo="day"
                  value={value}
                  shouldDisableDate={isWeekend}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Booking;
