/* eslint-disable prettier/prettier */
import { Button, CircularProgress } from "@mui/material";
import React from "react";
interface Props {
  type?: "button" | "submit";
  value: string;
  isLoading?: boolean;
  size?: "small" | "large" | "medium";
  clickFunction?: () => void | undefined | Promise<boolean>;
}

const ButtonLoader: React.FC<Props> = ({
  type = "submit",
  size = "small",
  value,
  isLoading,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clickFunction = () => { },
}) => {
  return (
    <Button
      onClick={() => clickFunction()}
      type={type}
      color="inherit"
      size={size}
      variant="contained"
      className="relative w-full px-4 py-3 font-medium text-white bg-black rounded btn-lg btn-block hover:bg-gray-800">
      <span className="relative z-10">{value}</span>
      {isLoading && (
        <span className="absolute z-20 flex items-center justify-center w-full h-full bg-gray-600">
          <CircularProgress size={24} style={{ color: "#ffffff" }} />
        </span>
      )}
    </Button>
  );
};
export default ButtonLoader;
