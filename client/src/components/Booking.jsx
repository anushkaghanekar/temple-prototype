// client/src/components/Booking.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";

export default function Booking() {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '10:00',
    priority: false,
    temple: 'Somnath',
  });
  const [result, setResult] = useState(null);
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

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/book`, form);
      setResult(res.data);
    } catch (err) {
      alert('Error booking: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 500, width: '100%' }}>
        {/* Language Switch */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "10px" }}>
          <button onClick={() => i18n.changeLanguage("en")}>English</button>
          <button onClick={() => i18n.changeLanguage("hi")}>हिन्दी</button>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>{t("Book Darshan")}</h2>

        <div
          style={{
            padding: 20,
            borderRadius: 10,
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            backgroundColor: '#fff',
          }}
        >
          <form
            onSubmit={submit}
            style={{ display: 'flex', flexDirection: 'column', gap: 15 }}
          >
            <input
              placeholder={t("name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
              style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="checkbox"
                checked={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.checked })}
              />
              {t("priority")}
            </label>
            <div>
              <label style={{ marginRight: 10 }}>{t("temple")}:</label>
              <select
                value={form.temple}
                onChange={(e) => setForm({ ...form, temple: e.target.value })}
                style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc', width: '100%' }}
              >
                {temples.map((temple) => (
                  <option key={temple} value={temple}>
                    {temple}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              style={{
                padding: 12,
                borderRadius: 5,
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: 10,
              }}
            >
              {t("book")}
            </button>
          </form>
        </div>

        {result && (
          <div
            style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 10,
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#e8f5e9',
            }}
          >
            <h4 style={{ color: '#2e7d32' }}>{t("bookingConfirmed")}</h4>
            <pre style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5 }}>
              {JSON.stringify(result.booking, null, 2)}
            </pre>
            {result.qrDataUrl && (
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <img src={result.qrDataUrl} alt="QR" style={{ width: 200 }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
