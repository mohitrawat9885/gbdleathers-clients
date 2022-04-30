import React, { useEffect } from "react";
import Categorys from "./Categorys/Categorys";
import Header from "../Header/Header";
import WorkshopCalendar from "../Workshop/WorkshopCalendar/WorkshopCalendar";
import Footer from "../Footer/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <WorkshopCalendar />
      <Categorys />
      <Footer />
    </>
  );
}
