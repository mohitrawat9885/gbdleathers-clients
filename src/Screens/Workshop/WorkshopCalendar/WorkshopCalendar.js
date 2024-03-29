// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import "./WorkshopCalendar.css";
import Zoom from "react-medium-image-zoom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./WorkshopCalendar.css";
import "./CalendarCustom.css";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "react-image-gallery/styles/css/image-gallery.css";

import { Loading } from "../../../GlobalState";
import { useAlert } from "react-alert";

// const localizer = momentLocalizer(moment);
// const workshops = require("./data.json");

export default function WorkshopCalendar() {
  const alert = useAlert();
  const [, setPageLoading] = React.useContext(Loading);
  const [todayDate, setTodayDate] = useState(new Date());

  const [regWorkshop, setRegWorkshop] = useState({ name: "", id: "" });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  const [dateWorkshops, setDateWorkshops] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [workshopList, setWorkshopList] = useState({});

  const getAllWorkshop = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `${global.api}/client/workshop/all?sort=-start`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setWorkshops(res.data);
        const w = res.data;
        let temp_WorkshopList = {};
        for (let i in w) {
          const d = new Date(w[i].start);
          let index = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          if (!temp_WorkshopList[index]) {
            temp_WorkshopList[index] = [w[i]];
          } else {
            temp_WorkshopList[index].push(w[i]);
          }
        }
        setWorkshopList(temp_WorkshopList);
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      // console.log(error);
    }
    // setLoading(false);
  };
  const setComingWorkshop = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `${global.api}/client/workshop/upcoming?limit=1&sort=start`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        // console.log(res.data);
        setTodayDate(new Date(res.data[0].start));
        setDateWorkshops(res.data);
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      // console.log(error);
    }
    // setLoading(false);
  };
  useEffect(() => {
    getAllWorkshop();
    setComingWorkshop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // var d = document.querySelectorAll(".fc-daygrid-day");
  // // d.className += " ripple";
  // for (let i = 0; i < d.length; i++) {
  //   d[i].className += " ripple";
  //   console.log(d[i].classList);
  // }

  const registerWorkshop = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(`${global.api}/client/workshop/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number,
          workshop: regWorkshop.id,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        handleRegister();
        setName("");
        setEmail("");
        setNumber("");
        setPageLoading(false);
        window.location.assign(res.payment_url);
        // alert.success("Thanks for Registering in this Workshop.");
      } else {
        setPageLoading(false);
        alert.error(res.message);
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      // console.log(error);
    }
    // setLoading(false);
  };
  function handleRegister(workshop) {
    document.getElementById("workshops-popup-1").classList.toggle("open-popup");
    document.body.classList.toggle("lock-screen");
    setRegWorkshop(() => {
      let nw = { name: "", id: "" };
      if (!workshop) return nw;
      nw.name = workshop.name ? workshop.name : "";
      nw.id = workshop._id ? workshop._id : "";
      return nw;
    });
  }
  function setWorkshopByDate(date) {
    const d = new Date(date);
    setTodayDate(d);
    const index = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (workshopList[index]) {
      setDateWorkshops(workshopList[index]);
    } else {
      setDateWorkshops([]);
    }
    // console.log(workshopList[index]);
  }
  function getDateTime(d, op, fm) {
    const date = new Date(d);
    if (op === "time") {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.toString().padStart(2, "0");
      let strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    } else if (op === "date") {
      let _date;
      if (date.getDate() < 10) {
        _date = `${"0" + date.getDate()}`;
      } else _date = date.getDate();
      let months = [];
      if (fm) {
        months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      } else {
        months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      }

      return `${_date}-${months[date.getMonth()]}-${date.getFullYear()}`;
    }
  }
  function getWorkshopBanner() {
    if (dateWorkshops.length === 0) {
      return (
        <div
          className="shop-calendar-details"
          style={{
            width: "100%",
            // height: "70vh  ",
            border: "1px solid",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            color: "gray",
            borderColor: "lightgray",
          }}
        >
          <p>No Workshop on this date</p>
        </div>
      );
    }
    return (
      <>
        {dateWorkshops.map((workshop, index) => (
          <div
            key={index}
            style={{
              marginBottom: "4rem",
            }}
          >
            <Zoom>
              <img src={`${global.image_path}${workshop.banner}`} alt="" />
            </Zoom>
            <div className="shop-calendar-details">
              <span className="shop-workshops-name">{workshop?.name}</span>
              <span className="shop-workshops-d">{workshop?.location}</span>
              <span className="shop-workshops-d">QTR: {workshop?.price}</span>
              {workshop?.days.map((day, index) => (
                <div
                  key={index}
                  style={{
                    // width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // border: "1px solid red",
                    width: "100%",
                    marginBottom: "1rem",
                    // marginTop: ".3rem"
                  }}
                >
                  <div>
                    <p className="shop-workshops-d">
                      {getDateTime(day.start, "date")}
                    </p>
                    <p className="shop-workshops-d">
                      {getDateTime(day.start, "time")}
                    </p>
                  </div>
                  <p className="shop-workshops-d">
                    {workshop?.days.length === 1
                      ? "One Day Workshop"
                      : `Day ${index + 1}`}
                  </p>
                  <div>
                    <p className="shop-workshops-d">
                      {getDateTime(day.end, "date")}
                    </p>
                    <p className="shop-workshops-d">
                      {getDateTime(day.end, "time")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="calendar-workshops-register-btn">
              <button
                className="ripple"
                onClick={() => handleRegister(workshop)}
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      <div className="shop-calendar-div">
        <div className="shop-calendar">
          <p className="shop-calendar-heading">Workshop Calendar</p>
          <FullCalendar
            // defaultView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            selectable={true}
            events={workshops.map((d, i) => ({
              title: d.name,
              start: new Date(d.start),
              end: new Date(d.end),
            }))}
            dateClick={(e) => setWorkshopByDate(e.date)}
            eventClick={(e) => setWorkshopByDate(e.event.start)}
          />
        </div>
        <div className="shop-calendar-detail">
          <div className="shop-calendar-date">
            <p className="shop-calendar-d">
              {getDateTime(todayDate, "date", true)}
            </p>
          </div>
          {getWorkshopBanner()}
        </div>
      </div>
      <div id="workshops-popup-1" className="workshops-popup">
        <div className="workshop-popup-page">
          <div
            style={{
              width: "100%",
            }}
          >
            <span
              style={{
                float: "right",
                cursor: "pointer",
              }}
              onClick={handleRegister}
            >
              ❌
            </span>
          </div>

          <div className="workshops-register-heading">
            <p>{regWorkshop.name}</p>
          </div>
          <div className="workshops-register-detail">
            <label htmlFor="fname">FULL NAME</label>
            <br />
            <input
              type="text"
              id="fname"
              name="fname"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="workshops-register-detail">
            <label htmlFor="email">E-Mail</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="workshops-register-detail">
            <label htmlFor="number">NUMBER</label>
            <br />
            <input
              type="text  "
              id="number"
              name="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </div>
          <div className="workshops-register-submit">
            <button className="ripple" onClick={registerWorkshop}>
              Register
            </button>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          height: "100vh",
        }}
      ></div> */}
    </>
  );
}
