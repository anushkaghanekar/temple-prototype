import React from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>User Dashboard</h2>
      <nav style={{ marginTop: 20 }}>
        <Link to="/book" style={{ margin: "0 15px" }}>Booking</Link>
        <Link to="/status" style={{ margin: "0 15px" }}>Crowd Status</Link>
        <Link to="/info" style={{ margin: "0 15px" }}>Temple Info</Link>
        <Link to="/alerts" style={{ margin: "0 15px" }}>Alerts</Link>
      </nav>
    </div>
  );
}
