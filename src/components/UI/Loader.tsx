import React from "react";
import { LoaderStylesBig, LoaderStylesSmall } from "../../Styles/Loader";

interface LoaderProps {
  isBigLoader: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isBigLoader }) => {
  return (
    <div className="lds-circle">
      <div></div>
      {isBigLoader ? <LoaderStylesBig /> : <LoaderStylesSmall />}
    </div>
  );
};
export default Loader;
