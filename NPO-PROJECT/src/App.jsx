import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Home from './Pages/Home/Home';
import Mission from './Pages/Mission/Mission';
import News from './Pages/News/News';
import Projects from './Pages/Projects/Projects';
import Contacts from './Pages/Contacts/Contacts';
import EventsRegistration from './Pages/EventsRegistration/EventsRegistration';
import VisitRequestForm from './Pages/VisitRequestForm/VisitRequestForm';
import DonationForm from './Pages/DonationForm/DonationForm';
import ActivityHistory from './Pages/ActivityHistory/ActivityHistory';
import PodCast from './Pages/PodCast/PodCast';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from './Components/Admin/Admin';
import AdminLogin from './Components/Authentication/AdminLogin';
import EmailLinkHandler from './Components/Authentication/EmailLinkHandler';
import useDarkMode from './Components/Common/Theme'

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    // Wrap whole app to toggle dark mode class globally
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <NavigationBar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Dark mode toggle button fixed top-right */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white shadow transition-colors"
          >
            {darkMode ? (
              // Sun icon for light mode
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>

        <main className="flex-grow pt-32 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/news" element={<News />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/eventsregistration" element={<EventsRegistration />} />
            <Route path="/visitrequestform" element={<VisitRequestForm />} />
            <Route path="/donationform" element={<DonationForm />} />
            <Route path="/activityhistory" element={<ActivityHistory />} />
            <Route path="/podcast" element={<PodCast />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admin/login' element={<AdminLogin />} /> 
            <Route path="/email-link" element={<EmailLinkHandler />} /> 
          </Routes>
        </main>

        <ToastContainer position="top-right" autoClose={3000} />
        <Footer />

      </div>
    </div>
  );
}

export default App;
