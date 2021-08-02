import React from "react";
import "./Notfound.css";

const PageNotFound = () => {
  return (
    <div>
      <p
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
          margin: "0px 15px",
        }}
      >
        Sorry ! The page you are looking for is not found
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100vw" }}
      >
        <img
          className="image"
          src={require("./assets/24.png")}
          alt="not found"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
