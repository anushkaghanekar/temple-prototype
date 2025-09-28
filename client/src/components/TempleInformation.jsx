// client/src/components/TempleInformation.jsx
import React, { useState } from 'react';

const templesList = [
  'Somnath',
  'Tirupati Balaji',
  'Meenakshi Temple',
  'Brihadeeswarar Temple',
  'Jagannath Temple',
  'Golden Temple',
  'Vaishno Devi',
  'Padmanabhaswamy Temple',
  'Kamakhya Temple',
  'Siddhivinayak Temple'
];

// Dummy data for each temple
const templesData = {
  'Somnath': {
    history: "Somnath Temple is one of the most revered Shiva temples in India, located in Gujarat.",
    timings: "5:00 AM - 10:00 PM",
    rituals: ["Morning Aarti", "Evening Aarti", "Special Poojas"],
    facilities: ["Restrooms", "Parking", "Medical Facilities", "Food Stalls"],
    events: [
      { date: "2025-10-01", event: "Festival of Shiva" },
      { date: "2025-10-15", event: "Special Evening Aarti" }
    ],
    virtualDarshanLink: "https://somnathtemple.org/virtual-darshan"
  },
  'Tirupati Balaji': {
    history: "Tirupati Balaji Temple is dedicated to Lord Venkateswara and attracts millions of devotees.",
    timings: "4:00 AM - 9:00 PM",
    rituals: ["Suprabhatam", "Abhishekam", "Evening Aarti"],
    facilities: ["Restrooms", "Parking", "Food Stalls"],
    events: [
      { date: "2025-11-01", event: "Brahmotsavam Festival" }
    ],
    virtualDarshanLink: "https://tirupatibalaji.ap.gov.in/virtual-darshan"
  },
  // Add similar data for other temples
  'Meenakshi Temple': {
    history: "Meenakshi Temple is a historic Hindu temple located in Madurai, Tamil Nadu.",
    timings: "6:00 AM - 8:00 PM",
    rituals: ["Morning Pooja", "Evening Pooja"],
    facilities: ["Restrooms", "Parking", "Food Stalls"],
    events: [{ date: "2025-12-01", event: "Chithirai Festival" }],
    virtualDarshanLink: "#"
  },
  'Brihadeeswarar Temple': {
    history: "Brihadeeswarar Temple, also known as Big Temple, is located in Thanjavur, Tamil Nadu.",
    timings: "6:00 AM - 9:00 PM",
    rituals: ["Abhishekam", "Daily Aarti"],
    facilities: ["Restrooms", "Parking"],
    events: [{ date: "2025-12-15", event: "Mahashivaratri" }],
    virtualDarshanLink: "#"
  },
  'Jagannath Temple': {
    history: "Jagannath Temple is in Puri, Odisha, famous for the annual Rath Yatra.",
    timings: "5:00 AM - 10:00 PM",
    rituals: ["Morning Aarti", "Evening Aarti"],
    facilities: ["Restrooms", "Food Stalls", "Parking"],
    events: [{ date: "2025-07-01", event: "Rath Yatra" }],
    virtualDarshanLink: "#"
  },
  'Golden Temple': {
    history: "Golden Temple in Amritsar is the holiest shrine for Sikhs, known for its golden facade.",
    timings: "3:00 AM - 10:00 PM",
    rituals: ["Early Morning Pooja", "Evening Pooja"],
    facilities: ["Restrooms", "Langar (Food)"],
    events: [{ date: "2025-09-15", event: "Gurpurab" }],
    virtualDarshanLink: "#"
  },
  'Vaishno Devi': {
    history: "Vaishno Devi Temple is located in Jammu and Kashmir and attracts millions of devotees annually.",
    timings: "6:00 AM - 10:00 PM",
    rituals: ["Darshan", "Aarti"],
    facilities: ["Restrooms", "Medical Facilities", "Food Stalls"],
    events: [{ date: "2025-08-25", event: "Navratri Festival" }],
    virtualDarshanLink: "#"
  },
  'Padmanabhaswamy Temple': {
    history: "Padmanabhaswamy Temple is in Thiruvananthapuram, Kerala, known for its wealth and architecture.",
    timings: "5:00 AM - 8:00 PM",
    rituals: ["Morning Pooja", "Evening Pooja"],
    facilities: ["Restrooms", "Parking", "Food Stalls"],
    events: [{ date: "2025-09-10", event: "Alpashayana" }],
    virtualDarshanLink: "#"
  },
  'Kamakhya Temple': {
    history: "Kamakhya Temple in Assam is famous for its tantric rituals and Ambubachi Mela.",
    timings: "6:00 AM - 9:00 PM",
    rituals: ["Morning Pooja", "Evening Pooja"],
    facilities: ["Restrooms", "Parking"],
    events: [{ date: "2025-06-21", event: "Ambubachi Mela" }],
    virtualDarshanLink: "#"
  },
  'Siddhivinayak Temple': {
    history: "Siddhivinayak Temple in Mumbai is dedicated to Lord Ganesha.",
    timings: "5:30 AM - 9:00 PM",
    rituals: ["Morning Aarti", "Evening Aarti"],
    facilities: ["Restrooms", "Parking", "Food Stalls"],
    events: [{ date: "2025-09-05", event: "Ganesh Chaturthi" }],
    virtualDarshanLink: "#"
  }
};

export default function TempleInformation() {
  const [selectedTemple, setSelectedTemple] = useState('Somnath');
  const temple = templesData[selectedTemple];

  return (
    <div style={{
      minHeight: '100vh',
      padding: 20,
      backgroundColor: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{ maxWidth: 800, width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Temple Information</h2>

        {/* Temple Selector */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <label style={{ fontWeight: 'bold', marginRight: 10 }}>Select Temple:</label>
          <select
            value={selectedTemple}
            onChange={e => setSelectedTemple(e.target.value)}
            style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }}
          >
            {templesList.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Temple Details */}
        <div style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          marginBottom: 20
        }}>
          <h3>History</h3>
          <p>{temple.history}</p>

          <h3>Timings</h3>
          <p>{temple.timings}</p>

          <h3>Rituals</h3>
          <ul>{temple.rituals.map((r, idx) => <li key={idx}>{r}</li>)}</ul>

          <h3>Nearby Facilities</h3>
          <ul>{temple.facilities.map((f, idx) => <li key={idx}>{f}</li>)}</ul>

          <h3>Upcoming Events</h3>
          {temple.events.length === 0 ? <p>No upcoming events.</p> :
            <ul>{temple.events.map((e, idx) => <li key={idx}>{e.date} - {e.event}</li>)}</ul>
          }

          <h3>Virtual Darshan</h3>
          <a
            href={temple.virtualDarshanLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', fontWeight: 'bold' }}
          >
            Book Virtual Darshan
          </a>
        </div>
      </div>
    </div>
  );
}
