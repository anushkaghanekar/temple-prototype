import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Admin Dashboard</h2>
      <nav style={{ marginTop: 20 }}>
        <Link to="/status" style={{ margin: "0 15px" }}>Crowd Status</Link>
        <Link to="/bookings" style={{ margin: "0 15px" }}>Manage Bookings</Link>
        <Link to="/admin-tools" style={{ margin: "0 15px" }}>Admin Tools</Link>
      </nav>
    </div>
  );
}
