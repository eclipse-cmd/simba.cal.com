import { toast } from "react-toastify";

export const error = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
  });
};

export const success = (message: string) => {
  toast.success(message, {
    position: "top-center",
  });
};
