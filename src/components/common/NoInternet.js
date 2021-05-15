import React, { useState, useEffect } from "react";

export default function NoInternet() {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [dismissOnlineStatus, setDismissOnlineStatus] = useState(true);

  const backOnline = () => {
    setDismissOnlineStatus(false);
    setOnlineStatus(true);
    setTimeout(() => {
      setDismissOnlineStatus(true);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener("online", () => backOnline());
    window.addEventListener("offline", () => setOnlineStatus(false));

    return () => {
      window.removeEventListener("online", null);
      window.removeEventListener("offline", null);
    };
  }, []);

  const reloadPage = () => {
    window.location.reload();
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
