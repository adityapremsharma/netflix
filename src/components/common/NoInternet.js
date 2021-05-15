import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NoInternet() {
  const history = useHistory();

  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [dismissOnlineStatus, setDismissOnlineStatus] = useState(true);

  const backOnline = () => {
    setDismissOnlineStatus(false);
    setOnlineStatus(true);
    setTimeout(() => {
      setDismissOnlineStatus(true);
      reloadPage();
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener("online", () => backOnline());
    window.addEventListener("offline", () => setOnlineStatus(false));

    return () => {
      window.removeEventListener("online", null);
      window.removeEventListener("offline", null);
    };

    // eslint-disable-next-line
  }, []);

  const reloadPage = () => {
    // window.location.reload();
    history.go(0);
  };

  return !onlineStatus ? (
    <div className="no-internet">
      <h3>
        Please check your internet connection.
        <span onClick={reloadPage}>Reload</span>
      </h3>
    </div>
  ) : (
    !dismissOnlineStatus && (
      <div
        className="no-internet"
        style={{ backgroundColor: "rgba(0, 255, 0, 0.5)" }}
      >
        <h3>You're back online! Enjoy.</h3>
      </div>
    )
  );
}
