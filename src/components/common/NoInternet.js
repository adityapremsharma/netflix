import React, { useState, useEffect } from "react";

export default function NoInternet() {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setOnlineStatus(true));
    window.addEventListener("offline", () => setOnlineStatus(false));

    return () => {
      window.removeEventListener("online", null);
      window.removeEventListener("offline", null);
    };
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    !onlineStatus && (
      <div className="no-internet">
        <h3>
          Please check your internet connection.
          <span onClick={reloadPage}>Reload</span>
        </h3>
      </div>
    )
  );
}
