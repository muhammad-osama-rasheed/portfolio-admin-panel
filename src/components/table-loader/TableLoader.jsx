import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
function TableLoader() {
  return (
    <div
      style={{
        marginBottom: "30px",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <FidgetSpinner
        visible={true}
        height="40"
        width="40"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        backgroundColor="#2C98F0"
      />
    </div>
  );
}

export default TableLoader;

{
  /* <MagnifyingGlass
visible={true}
height="60"
width="60"
ariaLabel="magnifying-glass-loading"
wrapperStyle={{}}
wrapperClass="magnifying-glass-wrapper"
glassColor="#c0efff"
color="#2C98F0"
/> */
}
