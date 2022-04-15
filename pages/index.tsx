import { Box, Tab, Tabs, Typography } from "@mui/material";
import type { NextPage } from "next";
import React from "react";

import AppLayout from "@components/AppLayout";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home: NextPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppLayout title="Booking">
      <div className="w-full p-4 my-10 xl:px-10">
        <div className="header-text">
          <div className="font-semibold">
            <p>Bookings</p>
          </div>
          <div className="mb-6 text-xs text-slate-500">
            <p>See upcoming and past events booked through you event type link</p>
          </div>
        </div>
        <div>
          <div className="tab">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab
                    label="upcoming"
                    {...a11yProps(0)}
                    className="text-sm font-semibold capitalize cursor-pointer tablinks text-slate-400"
                  />
                  <Tab
                    label="cancelled"
                    {...a11yProps(1)}
                    className="text-sm font-semibold capitalize cursor-pointer tablinks text-slate-400"
                  />
                  <Tab
                    label="past"
                    {...a11yProps(2)}
                    className="text-sm font-semibold capitalize cursor-pointer tablinks text-slate-400"
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="block p-5 bg-white border lg:flex">
                  <div className="flex w-full text-sm lg:6/12 lg:mx-2 md:text-sm ">
                    <div className="w-3/12">
                      <div className="text-xs md:text-sm">
                        <p>wed, 29 Dec</p>
                      </div>
                      <div className="my-3 text-xs text-slate-400">
                        <p>16:30- 16:45</p>
                      </div>
                    </div>
                    <div className="w-10/12">
                      <p> 15 Min Meeting between Daniel Tonel and Test</p>
                      <p className="my-1 text-sm text-slate-400">asfasdf</p>
                      <p className="my-1 text-sm">asdf@asdf.asdf</p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full lg:w-4/12">
                    <div className="p-2 ">
                      <a
                        href="#"
                        className="flex items-center justify-center w-full p-2 m-auto border lg:m-0">
                        <i className="mr-2 fa-solid fa-xmark"></i>
                        <span className="capitalize">cancel</span>
                      </a>
                    </div>
                    <div className="p-2 ">
                      <a
                        href="#"
                        className="flex items-center justify-center w-full p-2 m-auto border lg:m-0">
                        <i className="mr-2 fa-regular fa-clock"></i>
                        <span className="capitalize">reschedule</span>
                      </a>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <div className="block p-5 bg-white border lg:flex">
                  <div className="flex w-full text-sm lg:6/12 lg:mx-2 md:text-sm ">
                    <div className="w-3/12">
                      <div className="text-xs md:text-sm">
                        <p>wed, 29 Dec</p>
                      </div>
                      <div className="my-3 text-xs text-slate-400">
                        <p>16:30- 16:45</p>
                      </div>
                    </div>
                    <div className="w-10/12">
                      <p> 15 Min Meeting between Daniel Tonel and Test</p>
                      <p className="my-1 text-sm text-slate-400">asfasdf this is for cancel</p>
                      <p className="my-1 text-sm">asdf@asdf.asdf</p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full lg:w-4/12">
                    <div className="p-2 ">
                      <a
                        href="#"
                        className="flex items-center justify-center w-full p-2 m-auto border lg:m-0">
                        <i className="mr-2 fa-solid fa-xmark"></i>
                        <span className="capitalize">cancel</span>
                      </a>
                    </div>
                    <div className="p-2 ">
                      <a
                        href="#"
                        className="flex items-center justify-center w-full p-2 m-auto border lg:m-0">
                        <i className="mr-2 fa-regular fa-clock"></i>
                        <span className="capitalize">reschedule</span>
                      </a>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={2}>
                <div className="block p-5 bg-white border lg:flex">
                  <div className="flex w-full text-sm lg:6/12 lg:mx-2 md:text-sm ">
                    <div className="w-3/12">
                      <div className="text-xs md:text-sm">
                        <p>wed, 29 Dec</p>
                      </div>
                      <div className="my-3 text-xs text-slate-400">
                        <p>16:30- 16:45</p>
                      </div>
                    </div>
                    <div className="w-10/12">
                      <p> 15 Min Meeting between Daniel Tonel and Test</p>
                      <p className="my-1 text-sm text-slate-400">asfasdf this is for past</p>
                      <p className="my-1 text-sm">asdf@asdf.asdf</p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full lg:w-4/12">
                    <div className="p-2 ">
                      <a
                        href="#"
                        className="flex items-center justify-center w-full p-2 m-auto border lg:m-0">
                        <i className="mr-2 fa-solid fa-xmark"></i>
                        <span className="capitalize">cancel</span>
                      </a>
                    </div>
                    <div className="p-2 ">
                      <a
                        href="#"
                        className="flex items-center justify-center w-full p-2 m-auto border lg:m-0">
                        <i className="mr-2 fa-regular fa-clock"></i>
                        <span className="capitalize">reschedule</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-2 ">
                  <div className="flex items-center justify-center w-full p-2 m-auto bg-gray-400 border lg:w-3/12">
                    <span className="text-white capitalize">No more result</span>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
