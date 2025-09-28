// client/src/components/RoleSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    // Save selected role in localStorage (or context)
    localStorage.setItem("role", role);
    navigate("/dashboard"); // redirect to common dashboard page
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Select Your Role</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <button
            onClick={() => selectRole("admin")}
            style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Admin
          </button>
          <button
            onClick={() => selectRole("volunteer")}
            style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              backgroundColor: "#28a745",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Volunteer
          </button>
          <button
            onClick={() => selectRole("user")}
            style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              backgroundColor: "#ffc107",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
}
