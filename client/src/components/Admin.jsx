// client/src/components/Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const API = import.meta.env.VITE_API_URL || 'https://temple-prototype.onrender.com';
  const [queue, setQueue] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const d = new Date().toISOString().slice(0, 10);
    const q = await axios.get(`${API}/api/queue?date=${d}`);
    setQueue(q.data.bookings || []);
    const a = await axios.get(`${API}/api/alerts`);
    setAlerts(a.data.alerts || []);
  };

  useEffect(() => { load(); }, []);

  const sendAlert = async () => {
    if (!msg) return;
    await axios.post(`${API}/api/admin/alert`, { message: msg, type: 'warning' });
    setMsg('');
    load();
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: 20,
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{ maxWidth: 800, width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Admin Dashboard (Demo)</h2>

        {/* Queue Section */}
        <div style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          marginBottom: 30
        }}>
          <h3 style={{ color: '#1976d2', marginBottom: 15 }}>Queue (Today)</h3>
          {queue.length === 0 ? <p>No bookings for today.</p> : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {queue.map(b => (
                <li key={b.id} style={{
                  padding: '8px 10px',
                  marginBottom: 8,
                  backgroundColor: b.priority ? '#fff3e0' : '#e3f2fd',
                  borderRadius: 5
                }}>
                  {b.name} - {b.time} {b.priority && <span style={{ fontWeight: 'bold', color: '#ff5722' }}>(priority)</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Alerts Section */}
        <div style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#d32f2f', marginBottom: 15 }}>Alerts</h3>
          {alerts.length === 0 ? <p>No alerts.</p> : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {alerts.map(a => (
                <li key={a.id} style={{
                  padding: '8px 10px',
                  marginBottom: 8,
                  backgroundColor: '#ffebee',
                  borderRadius: 5
                }}>
                  {new Date(a.date).toLocaleString()} - {a.message}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Alert message"
              style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
            />
            <button
              onClick={sendAlert}
              style={{
                padding: '10px 20px',
                borderRadius: 5,
                border: 'none',
                backgroundColor: '#d32f2f',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Send Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
