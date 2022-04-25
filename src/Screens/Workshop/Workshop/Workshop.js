import React from "react";
import { useParams, Link } from "react-router-dom";

export default function Workshop() {
  const { id } = useParams();
  return <h1>Workshop id = : {id}</h1>;
}
