import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user);
  return <div>Profile</div>;
}
