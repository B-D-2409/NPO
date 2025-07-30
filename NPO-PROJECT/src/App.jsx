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
import Auth from './Components/Authentication/Auth';

function App() {
  return (
    <>
      <NavigationBar />

      <main className="pt-20 px-4">
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
          <Route path="/authentication" element={<Auth />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
