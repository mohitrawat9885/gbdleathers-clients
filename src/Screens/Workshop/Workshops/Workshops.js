import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkshopCalendar from "../WorkshopCalendar/WorkshopCalendar";
import "./Workshops.css";
import { Loading } from "../../../GlobalState";
import { useAlert } from "react-alert";

import Zoom from "react-medium-image-zoom";
export default function Workshops() {
  const { type } = useParams();
  const alert = useAlert();
  const [workshops, setWorkshops] = useState([]);
  const [regWorkshop, setRegWorkshop] = useState({ name: "", id: "" });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [, setPageLoading] = React.useContext(Loading);
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
  const getAllWorkshop = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `${global.api}/client/workshop/${type}?sort=-start`,
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
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      // console.log(error);
    }
    // setLoading(false);
  };
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
      // console.log(error);
    }
    // setLoading(false);
  };
  useEffect(() => {
    getAllWorkshop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
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
  return (
    <>
      <WorkshopCalendar />
      <div className="workshops-div">
        <div className="workshops-page">
          {workshops?.map((workshop, i) => (
            <div className="workshops-holder" key={i}>
              <div className="workshops-img">
                <Zoom>
                  <img
                    // className="hover-zoom"
                    src={`${global.image_path}${workshop.banner}`}
                    alt=""
                  />
                </Zoom>
              </div>
              <div className="workshops-detail">
                <span className="workshops-name">{workshop.name}</span>
                <span className="workshops-d">{workshop.location}</span>
                <span className="workshops-d">QTR:- {workshop.price}</span>
                {workshop.days.map((day, index) => (
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
                      <p className="workshops-d">
                        {getDateTime(day.start, "date")}
                      </p>
                      <p className="workshops-d">
                        {getDateTime(day.start, "time")}
                      </p>
                    </div>
                    <p className="workshops-d">
                      {workshop.days.length === 1
                        ? "One Day Workshop"
                        : `Day ${index + 1}`}
                    </p>
                    <div>
                      <p className="workshops-d">
                        {getDateTime(day.end, "date")}
                      </p>
                      <p className="workshops-d">
                        {getDateTime(day.end, "time")}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="workshops-register-btn">
                  <button onClick={() => handleRegister(workshop)}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
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
      <div
        style={{
          height: "80vh",
        }}
      ></div>
    </>
  );
}
