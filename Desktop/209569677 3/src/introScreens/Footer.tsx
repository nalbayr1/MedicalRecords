import React from 'react';
import clipboardImage from '../clipBoard.png'; // Adjust the path as necessary

function HomePage() {
  return (
    <>
      <style>{`
        /* HomePage Styles */
        .homepage-header {
          text-align: center;
          background-color: #007bff; /* This is a Bootstrap blue, adjust as needed */
          color: white;
          padding: 50px 20px;
          position: relative;
          height: 200px; /* Adjust based on your design */
        }

        .homepage-title {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .homepage-subtitle {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .image-container {
          position: absolute;
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
        }

        .homepage-image {
          height: auto;
          max-width: 100%;
          max-height: 200px; /* Adjust as necessary */
        }

        .main-content {
          padding: 20px;
          background-color: #f2f2f2; /* Light grey background for main content area */
        }

        /* Original Footer Styles */
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          background-color: #f8f8f8;
          padding: 20px;
          width: 100%;
          box-sizing: border-box; /* Ensures padding doesn't affect width */
        }

        .feature-box {
          width: calc(33.333% - 40px);
          margin: 10px;
          background: #fff;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        h3 {
          color: #333;
          margin-bottom: 5px;
        }

        p {
          color: #666;
          font-size: 0.9rem;
        }

        /* New Main Footer Styles */
        .main-footer {
          background-color: #007bff; /* Adjust the color to match your theme */
          color: white;
          padding: 20px 0;
          width: 100%; /* Ensures footer takes full width */
        }

        .footer-content {
          display: flex;
          justify-content: space-around;
          padding: 0 20px;
          max-width: 1200px; /* Adjust based on your design */
          margin: 0 auto;
        }

        .footer-section {
          margin: 10px;
        }

        .footer-heading {
          margin-bottom: 15px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li a {
          color: white;
          text-decoration: none;
          margin-bottom: 5px;
          display: block;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 20px;
        }

        .footer-bottom-links a {
          color: white;
          text-decoration: none;
          margin: 0 10px;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
          }

          .footer-section {
            margin-bottom: 20px;
          }

          .feature-box {
            width: calc(50% - 20px);
          }
        }

        @media (max-width: 480px) {
          .feature-box {
            width: 100%;
            margin: 10px 0;
          }
        }
      `}</style>
      <header className="homepage-header">
        <h1 className="homepage-title">Mobile Apps for Medical Records and Drugs</h1>
        <p className="homepage-subtitle">Bringing your health management into the digital age.</p>
        <div className="image-container">
          <img src={clipboardImage} alt="Clipboard" className="homepage-image" />
        </div>
      </header>
      <main className="main-content">
        {/* Placeholder for the main content */}
        <p>This area is for the main content of the homepage.</p>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
    return (
      <footer className="footer-container">
        <div className="feature-box">
          <div className="feature-icon">🗓️</div>
          <h3>Coordinate Appointments</h3>
          <p>Easily schedule and manage your appointments.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">💊</div>
          <h3>Medication Overview</h3>
          <p>Request refills and oversee your medication history.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">📄</div>
          <h3>Health Record Hub</h3>
          <p>Access and manage your updated health records.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">👤</div>
          <h3>Profile Customization</h3>
          <p>Update personal and contact information, and manage login details.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">📁</div>
          <h3>Document Interchange</h3>
          <p>Upload and handle your documents and forms with ease.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">🔒</div>
          <h3>Encrypted Communication</h3>
          <p>Send and receive secure messages with your provider.</p>
        </div>
        {/* New Main Footer */}
        <MainFooter />
      </footer>
    );
  }
  
  function MainFooter() {
    return (
      <div className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="/records">Medical Records</a></li>
              <li><a href="/appointments">Appointments</a></li>
              <li><a href="/billing">Billing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>
          {/* You can add more sections if needed */}
        </div>
        <div className="footer-bottom">
          <p>© 2023 Medical Record Data. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/terms">Terms of use</a>
            <a href="/privacy">Privacy policy</a>
          </div>
        </div>
      </div>
    );
  }
  

export default HomePage;
