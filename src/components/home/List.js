import React from "react";
import Card from "./Card";

export default function List(props) {
  const { title, data, verticalCard } = props;
  const baseImageURL = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="list">
      <h1 className="heading-secondary">{title}</h1>
      <div className="list-container">
        {data.map((item) => {
          const imagePath = verticalCard
            ? item.poster_path
            : item.backdrop_path;
          const className = verticalCard ? "card card-vertical" : "card";
          return (
            <Card
              key={item.id}
              title={item.title}
              image={baseImageURL + imagePath}
              className={className}
            />
          );
        })}
      </div>
    </div>
  );
}
