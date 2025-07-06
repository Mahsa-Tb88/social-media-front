import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";

// eslint-disable-next-line react/prop-types
export default function Item({ subject, text, value, viewer, isOwner }) {
  return isOwner ? (
    <ItemAbout
      subject={subject}
      text={text}
      value={value}
      myViewer={viewer}
      title="overview"
    >
      <Content subject={subject} value={value} text={text} />
    </ItemAbout>
  ) : (
    <Content subject={subject} value={value} text={text} />
  );
}
