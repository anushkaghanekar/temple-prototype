// client/src/components/CrowdStatus.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function CrowdStatus() {
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [temple, setTemple] = useState('Somnath');
  const API = import.meta.env.VITE_API_URL || 'https://temple-prototype.onrender.com';

  const temples = [
    'Somnath',
    'Tirupati Balaji',
    'Meenakshi Temple',
    'Brihadeeswarar Temple',
    'Jagannath Temple',
    'Golden Temple',
    'Vaishno Devi',
    'Padmanabhaswamy Temple',
    'Kamakhya Temple',
    'Siddhivinayak Temple',
  ];

  useEffect(() => {
    async function fetchStatus() {
      const d = new Date().toISOString().slice(0, 10);
      try {
        const res = await axios.get(`${API}/api/predict?date=${d}&temple=${encodeURIComponent(temple)}`);
        setStatus(res.data);

        const historyRes = await axios.get(`${API}/api/predict-history?temple=${encodeURIComponent(temple)}`);
        setHistory(historyRes.data.map(item => ({ ...item, score: Number(item.score) })));
      } catch (err) {
        console.error('Error fetching crowd status:', err);
      }
    }
    fetchStatus();
  }, [temple]);

  const getLevelColor = (level) => {
    if (level === 'Low') return '#4CAF50';     // green
    if (level === 'Medium') return '#FF9800';  // orange
    if (level === 'High') return '#F44336';    // red
    return '#9E9E9E';                          // gray
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: 20,
      backgroundColor: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Crowd Status</h2>

        {/* Temple Selector */}
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: 10 }}>Select Temple:</label>
          <select
            value={temple}
            onChange={e => setTemple(e.target.value)}
            style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }}
          >
            {temples.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Current Status Card */}
        {status ? (
          <div style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            marginBottom: 30
          }}>
            <h3 style={{ marginBottom: 10 }}>{temple}</h3>
            <p>
              Level: <span style={{
                padding: '4px 10px',
                borderRadius: 5,
                backgroundColor: getLevelColor(status.level),
                color: 'white',
                fontWeight: 'bold'
              }}>{status.level}</span>
            </p>
            <p>Score: <b>{status.score}</b></p>
            <p>Bookings: <b>{status.bookingsCount}</b></p>
          </div>
        ) : <p style={{ textAlign: 'center' }}>Loading...</p>}

        {/* Graph Card */}
        {history.length > 0 && (
          <div style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ textAlign: 'center', marginBottom: 20 }}>Crowd Prediction (Next 7 Days)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
