import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './introScreens/Header'; // Assuming this is the correct path
import Footer from './introScreens/Footer'; // Assuming this is the correct path
import PatientScreenHomePage from './PatientScreen/patientScreenHomePage'; // Correct import statement

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/PatientScreen/patientScreenHomePage" element={<PatientScreenHomePage />} />
        {/* Define other routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
