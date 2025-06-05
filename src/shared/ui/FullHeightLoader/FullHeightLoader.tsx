import { FC } from "react";
import { CircularProgress, CircularProgressProps } from "@heroui/react";

interface FullHeightLoaderProps {
  circularProgressProps?: CircularProgressProps;
}

export const FullHeightLoader: FC<FullHeightLoaderProps> = ({
  circularProgressProps,
}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CircularProgress {...circularProgressProps} />
    </div>
  );
};
