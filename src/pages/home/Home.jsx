import React from "react";

function Home() {
  return (
    <div>
      Home <div>Home</div> <div>Home</div>
      <div>Home</div>
      <img
        // src={`data:image/png;base64,${imageData}`}
        src="/images/express.png"
        alt=""
        style={{ width: "16px", height: "16px" }}
      />
      <img
        // src={`data:image/png;base64,${imageData}`}
        src="/images/react.png"
        alt=""
        style={{ width: "16px", height: "16px" }}
      />
    </div>
  );
}

export default Home;
