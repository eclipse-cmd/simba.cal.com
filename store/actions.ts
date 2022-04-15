import axios from "axios";
import { APIResponse } from "@helpers/types";
import { fecthLocalstorage } from "@helpers/index";

const token = fecthLocalstorage()?.token ?? false;
export const redirectHome = () => {
    if (typeof window !== undefined) {
      window.localStorage.removeItem("_simba");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  },
  getAuth = async () => {
    try {
      const response = await axios.get(`/api/v1/user/auth`, {
        headers: {
          token: `${token}`,
        },
      });
      const result = (await response.data) as APIResponse;
      if (!result.status) {
        redirectHome();
      }
      return result;
    } catch (error: any) {
      // error.response.status  => error code
      console.log(error);
      redirectHome();
    }
  },
  get = async (endpoint: string) => {
    try {
      const response = await axios.get(`/api/v1/${endpoint}`, {
        headers: {
          token: `${token}`,
        },
      });
      const result = (await response.data) as APIResponse;
      console.log(result);
    } catch (error: any) {
      const message = error.response.data.message ?? error.message;
      console.log(message);
    }
  },
  post = async (endpoint: string, data: any) => {
    try {
      const response = await axios.post(`/api/v1/${endpoint}`, data, {
        headers: {
          token: `${token}`,
        },
      });
      const result = response.data as APIResponse;
      console.log(result);
    } catch (error: any) {
      const message = error.response.data.message ?? error.message;
      console.log(message)
    }
  };
