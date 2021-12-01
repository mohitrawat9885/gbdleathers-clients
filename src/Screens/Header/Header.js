import React from "react";
import "./Header.css";
import TopBar from "./TopBar/TopBar";
import MainBar from "./MainBar/MainBar";
import DownBar from "./DownBar/DownBar";
export default function Header() {
  return (
    <>
      <TopBar />
      <MainBar />
      <DownBar />
    </>
  );
}
