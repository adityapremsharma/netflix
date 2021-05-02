import React from "react";
import { Link } from "react-router-dom";

export default function Message() {
  return (
    <div className="message">
      <p>
        This demo is a UI based project and the API used in it doesn't contain
        any content.
        <br />
        <br />
        Developed with ❤️ by Aditya Prem Sharma using React.JS for practice
        purposes.
      </p>

      <Link to="/">
        <button className="btn-secondary">Go back</button>
      </Link>
    </div>
  );
}
