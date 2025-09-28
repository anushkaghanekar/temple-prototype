// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Booking from './components/Booking';
import CrowdStatus from './components/CrowdStatus';
import Admin from './components/Admin';
import TempleInformation from './components/TempleInformation';
import SOSButton from './components/SOSButton'; // Imported SOSButton

// New imports
import RoleSelection from './components/RoleSelection';
import UserDashboard from './components/UserDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: '100vh',
          padding: 20,
          fontFamily: 'sans-serif',
          background: 'linear-gradient(to right, #ffe6cc, #fff2e6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Temple Sticker */}
        <img
          src="https://png.pngtree.com/png-clipart/20250519/original/pngtree-traditional-hindu-temple-vector-png-image_21032597.png"
          alt="Temple Sticker"
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
            width: 120,
            opacity: 0.8,
          }}
        />
        {/* Devotee Sticker */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4330/4330620.png"
          alt="Devotee Sticker"
          style={{
            position: 'absolute',
            bottom: 10,
            left: 20,
            width: 150,
            opacity: 0.8,
          }}
        />

        {/* Header & Slogan */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: '2.8rem', color: '#d2691e', marginBottom: 10 }}>
            Temple Prototype
          </h1>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#8b4513' }}>
            “Experience devotion, convenience, and safety in one place!”
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            marginBottom: 30,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#ff8c00',
              color: 'white',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Roles
          </Link>
          <Link
            to="/book"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Book
          </Link>
          <Link
            to="/status"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#2196f3',
              color: 'white',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Crowd Status
          </Link>
          <Link
            to="/info"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#9c27b0',
              color: 'white',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Temple Info
          </Link>
          <Link
            to="/admin"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#f44336',
              color: 'white',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Admin
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/status" element={<CrowdStatus />} />
          <Route path="/info" element={<TempleInformation />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-tools" element={<Admin />} />
        </Routes>

        {/* Floating SOS Button */}
        <div style={{ position: 'absolute', bottom: 170, right: 60, left: 50, zIndex: 1000 }}>
          <SOSButton />
        </div>
      </div>
    </BrowserRouter>
  );
}
