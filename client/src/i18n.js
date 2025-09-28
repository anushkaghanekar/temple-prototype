import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      booking: "Booking",
      crowdStatus: "Crowd Status",
      templeInfo: "Temple Information",
      alerts: "Alerts",
      sos: "SOS",
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      booking: "बुकिंग",
      crowdStatus: "भीड़ की स्थिति",
      templeInfo: "मंदिर की जानकारी",
      alerts: "सूचनाएं",
      sos: "आपातकाल (SOS)",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  interpolation: { escapeValue: false },
});

export default i18n;
