import React from "react";

const SOSButton = () => {
  const sendSOS = async () => {
    try {
      await fetch("/api/sos", {
        method: "POST",
        body: JSON.stringify({ user: "User1" }),
        headers: { "Content-Type": "application/json" },
      });
      alert("SOS sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send SOS");
    }
  };

  return (
    <button onClick={sendSOS} style={{ padding: "10px", background: "red", color: "white" }}>
      Send SOS
    </button>
  );
};

export default SOSButton;
