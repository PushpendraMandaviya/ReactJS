import { Typography } from "@mui/material";
import React from "react";
import CarVideo from "../../Assets/Images/HomePage/CarVideo.mp4";
// import CarVideoWhite from '../../assets/Images/HomePage/CarVideoWhite.mp4';

function ShowCaseVideo({ isDarkMode }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "8rem",
          marginBottom: "10rem",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontSize: "3rem",
            color: isDarkMode ? "white" : "#7F27FF",
            fontWeight: "light",
            lineHeight: "1.3",
          }}
        >
          We Are The Leaders In
          <br />
          The Automotive Industry
        </Typography>
        <Typography
          variant="h6"
          style={{
            color: isDarkMode ? "white" : "black",
            margin: "0.5rem",
            maxWidth: "50%",
            lineHeight: "1.8",
          }}
        >
          We stand at the forefront of the automotive industry, setting
          standards and driving innovation forward. With our unparalleled
          expertise and dedication, we pave the way for excellence in automotive
          technology and services.
        </Typography>
      </div>
      {/* <center>

<video src={CarVideo}  alt="Black Shade Car" style={{marginTop: '8rem', height: '80%', maxWidth: '92%', borderRadius: '10px', boxShadow: '0 10px 18px rgba(0, 0, 1, 1)' }} autoPlay loop playsInline />
</center> */}
    </div>
  );
}

export default ShowCaseVideo;
