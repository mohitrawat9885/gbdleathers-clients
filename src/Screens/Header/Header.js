import React, { useContext } from "react";
import "./Header.css";
import TopBar from "./TopBar/TopBar";
import MainBar from "./MainBar/MainBar";
import DownBar from "./DownBar/DownBar";
// import LinearProgress from "@mui/material/LinearProgress";
import ReactLoading from "react-loading";

import { Loading } from "../../GlobalState";

export default function Header() {
  const [pageLoading] = useContext(Loading);
  function GetLoadingDiv() {
    if (pageLoading) {
      return (
        <div className="all-page-loading">
          <ReactLoading
            type="spin"
            color="rgb(253, 110, 110)"
            height={45}
            width={45}
          />
        </div>
      );
    }
    return <></>;
  }
  return (
    <>
      <GetLoadingDiv />
      <TopBar />
      <MainBar />
      <DownBar />
    </>
  );
}
