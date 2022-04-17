import { Box, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

import * as toast from "@helpers/toast";

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

interface HomeProps {
  upcoming: any;
  cancelled: any;
  past: any;
}

const Home: React.FC<HomeProps> = ({ upcoming, cancelled, past }) => {
  const [value, setValue] = React.useState(0);
  const [upcomingMeeting, setUpcomingMeeting] = useState([]);
  const [cancelledMeeting, setCancelledMeeting] = useState([]);
  const [pastMeeting, setPastMeeting] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const cancledMeeting = async (id: string) => {
    const response = await axios.delete("/api/meeting?id=" + id);

    const meeting = response.data.meeting;

    setUpcomingMeeting(upcomingMeeting.filter((meeting) => meeting !== meeting.id));
    setCancelledMeeting([...cancelledMeeting, { ...meeting }]);
    toast.success(response.data.message);
    console.log(upcomingMeeting);
  };

  useEffect(() => {
    setUpcomingMeeting(JSON.parse(upcoming));
    setCancelledMeeting(JSON.parse(cancelled));
    setPastMeeting(JSON.parse(past));
  }, [cancelled, past, upcoming]);

  return (
    <AppLayout title="Booking">
      <div className="w-full p-4 py-10 xl:px-10">
        <div className="header-text">
          <div className="font-semibold">
            <p>Bookings</p>
          </div>
          <div className="mb-6 text-xs text-slate-500">
            <p>See upcoming and past events booked through your event type link</p>
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
                {upcomingMeeting.length > 0 ? (
                  <>
                    {upcomingMeeting.map((meeting: any, index: number) => (
                      <div key={index} className="block p-5 mb-5 bg-white border lg:flex">
                        <div className="flex w-full text-sm lg:6/12 lg:mx-2 md:text-sm ">
                          <div className="w-3/12">
                            <div className="text-xs md:text-sm">
                              <p>{moment(meeting.time).format("ddd, Do MMM")}</p>
                            </div>
                            <div className="my-3 text-xs text-slate-400">
                              <p>
                                {moment(meeting.time).format("h:mm a")} - <span>For 15mins</span>
                              </p>
                            </div>
                          </div>
                          <div className="w-10/12">
                            <p> 15 Min Meeting between Daniel Tonel and {meeting.attendee_name}</p>
                            <p className="my-1 text-sm text-slate-400">
                              {meeting.notes ?? "No notes available"}
                            </p>
                            <p className="my-1 text-sm">{meeting.attendee_email}</p>
                          </div>
                        </div>
                        <div className="flex justify-center w-full lg:w-4/12">
                          <div className="p-2 ">
                            <a
                              href={"javascript:void(0)"}
                              onClick={() => cancledMeeting(meeting.id)}
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
                    ))}
                  </>
                ) : (
                  <>
                    <div className="p-2 ">
                      <div className="flex items-center justify-center w-full p-2 m-auto bg-gray-400 border lg:w-3/12">
                        <span className="text-white capitalize">No more result</span>
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>

              <TabPanel value={value} index={1}>
                {cancelledMeeting.length > 0 ? (
                  <>
                    {cancelledMeeting.map((meeting: any, index: number) => (
                      <div key={index} className="block p-5 mb-5 bg-white border lg:flex">
                        <div className="flex w-full text-sm lg:6/12 lg:mx-2 md:text-sm ">
                          <div className="w-3/12">
                            <div className="text-xs md:text-sm">
                              <p>{moment(meeting.time).format("ddd, Do MMM")}</p>
                            </div>
                            <div className="my-3 text-xs text-slate-400">
                              <p>
                                {moment(meeting.time).format("h:mm a")} - <span>For 15mins</span>
                              </p>
                            </div>
                          </div>
                          <div className="w-10/12">
                            <p> 15 Min Meeting between Daniel Tonel and {meeting.attendee_name}</p>
                            <p className="my-1 text-sm text-slate-400">
                              {meeting.notes ?? "No notes available"}
                            </p>
                            <p className="my-1 text-sm">{meeting.attendee_email}</p>
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
                    ))}
                  </>
                ) : (
                  <>
                    <div className="p-2 ">
                      <div className="flex items-center justify-center w-full p-2 m-auto bg-gray-400 border lg:w-3/12">
                        <span className="text-white capitalize">No more result</span>
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>

              <TabPanel value={value} index={2}>
                {pastMeeting.length > 0 ? (
                  <>
                    {pastMeeting.map((meeting: any, index: number) => (
                      <div key={index} className="block p-5 mb-5 bg-white border lg:flex">
                        <div className="flex w-full text-sm lg:6/12 lg:mx-2 md:text-sm ">
                          <div className="w-3/12">
                            <div className="text-xs md:text-sm">
                              <p>{moment(meeting.time).format("ddd, Do MMM")}</p>
                            </div>
                            <div className="my-3 text-xs text-slate-400">
                              <p>
                                {moment(meeting.time).format("h:mm a")} - <span>For 15mins</span>
                              </p>
                            </div>
                          </div>
                          <div className="w-10/12">
                            <p> 15 Min Meeting between Daniel Tonel and {meeting.attendee_name}</p>
                            <p className="my-1 text-sm text-slate-400">
                              {meeting.notes ?? "No notes available"}
                            </p>
                            <p className="my-1 text-sm">{meeting.attendee_email}</p>
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
                    ))}
                  </>
                ) : (
                  <>
                    <div className="p-2 ">
                      <div className="flex items-center justify-center w-full p-2 m-auto bg-gray-400 border lg:w-3/12">
                        <span className="text-white capitalize">No more result</span>
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = async () => {
  const upcoming = await prisma?.meeting.findMany({
    where: {
      status: "upcoming",
    },
  });
  const cancelled = await prisma?.meeting.findMany({
    where: {
      status: "cancelled",
    },
  });
  const past = await prisma?.meeting.findMany({
    where: {
      status: "past",
    },
  });

  return {
    props: {
      upcoming: JSON.stringify(upcoming),
      cancelled: JSON.stringify(cancelled),
      past: JSON.stringify(past),
    },
  };
};

export default Home;
