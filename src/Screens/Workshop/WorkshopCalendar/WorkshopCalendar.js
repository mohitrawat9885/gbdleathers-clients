// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect, useContext } from "react";
import "./WorkshopCalendar.css";
import Zoom from "react-medium-image-zoom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./WorkshopCalendar.css";

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
  useEffect(() => {
    getAllWorkshop();
  }, []);

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

        alert.success("Thanks for Registering in this Workshop.");
      } else {
        alert.error("Please Register Again!");
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      console.log(error);
    }
    // setLoading(false);
  };
  function handleRegister(workshop) {
    document.getElementById("workshops-popup").classList.toggle("open-popup");
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
    console.log(workshopList[index]);
  }
  function getDateTime(d, op) {
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

      let months = [
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
      return `${_date}-${months[date.getMonth()]}-${date.getFullYear()}`;
    }
  }
  function getWorkshopBanner() {
    if (dateWorkshops.length === 0) {
      return (
        <div className="shop-calendar-details">
          <p>No Workshops found</p>
        </div>
      );
    }
    return (
      <>
        {dateWorkshops.map((workshop, index) => (
          <div key={index}>
            <Zoom>
              <img src={`${global.image_path}${workshop.banner}`} alt="" />
            </Zoom>
            <div className="shop-calendar-details">
              <span className="shop-workshops-name">{workshop?.name}</span>
              <span className="shop-workshops-d">{workshop?.location}</span>
              <span className="shop-workshops-d">QTR:- {workshop?.price}</span>
              {workshop?.days.map((day, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // border: "1px solid red",
                    width: "90%",
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
            <div className="workshops-register-btn">
              <button onClick={() => handleRegister(workshop)}>Register</button>
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
            defaultView="dayGridMonth"
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
            // height=
          />
          {/* <Calendar
            // dateClick={() => alert("k")}
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={(e) => console.log(e.message)}
            onSelecting={() => console.log("h")}
          /> */}
        </div>
        <div className="shop-calendar-detail">
          <div className="shop-calendar-date">
            <p className="shop-calendar-d">{todayDate.toDateString()}</p>
          </div>
          {getWorkshopBanner()}
        </div>
      </div>
      <div id="workshops-popup" className="workshops-popup">
        <div className="workshop-popup-page">
          <div
            style={{
              width: "100%",
            }}
          >
            <span
              style={{
                // position: "relative",
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
            <button onClick={registerWorkshop}>Register</button>
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
