import React from "react";

function NoPage() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1
        style={{
          color: "#2C98F0",
          fontWeight: "600",
          fontSize: "40px",
          fontFamily: "Quicksand, Arial, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "5px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          color: "#000000B3",
          fontWeight: "600",
          fontSize: "20px",
          fontFamily: "Quicksand, Arial, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "5px",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          color: "#000000B3",
          fontWeight: "500",
          fontSize: "14px",
          letterSpacing: "1px",
          fontFamily: "Quicksand, Arial, sans-serif",
        }}
      >
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

export default NoPage;
