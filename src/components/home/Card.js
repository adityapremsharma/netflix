import React from "react";

export default function Card(props) {
  const { title, image, className } = props;

  return <img src={image} alt={title} className={className} />;
}
