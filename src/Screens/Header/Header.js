import React,{useContext} from "react";
import "./Header.css";
import TopBar from "./TopBar/TopBar";
import MainBar from "./MainBar/MainBar";
import DownBar from "./DownBar/DownBar";
import LinearProgress from '@mui/material/LinearProgress';

import { Loading } from "../../GlobalState";

export default function Header() {
  const [pageLoading] = useContext(Loading);
  return (
    <>
      <TopBar />
      <MainBar />
      <DownBar />
      <div style={{
        color: 'gray',
        width: "100%",
        display: `${pageLoading ? 'inline': 'none'}`
      }}>
      <LinearProgress color="inherit" />
      </div>
     
    </>
  );
}
