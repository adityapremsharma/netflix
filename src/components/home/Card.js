import React from "react";

export default function Card(props) {
  const { title, image, className, onClick } = props;

  return (
    <img
      src={image}
      alt={title}
      className={className}
      onClick={() => onClick(title)}
    />
  );
}
