import React, { useState } from 'react';
import SignInPage from '../signIn/SignInPage'; // Adjust the import path as necessary
import footprintImage from '../footprint.png'; // Adjust the import path as necessary
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const auth = useAuth();

  const handleSignInClick = () => {
    setIsSignInOpen(true);
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleSignOut = () => {
    if (auth) { // Check if auth is not null
      auth.signOut();
    } else {
      console.error('Authentication context not available');
    }
  };

  const headerStyle = {
    backgroundColor: '#123456', // Replace with your desired header background color
    padding: '16px 32px',
    color: '#ffffff',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex', // Use flex here to align the title and the image
    alignItems: 'center', // This will vertically center the image with the text
  };

  const imageStyle = {
    width: '100px', // Adjust the size as needed
    marginRight: '12px', // Adjust the spacing as needed
  };

  const buttonStyle = {
    backgroundColor: '#6AC6DB', // Replace with your desired button color
    color: '#ffffff', // Replace with your desired button text color
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#efcdab', // Replace with your desired button hover color
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={titleStyle}>
          <img src={footprintImage} alt="Footprint" style={imageStyle} />
          <h1>Feet Pic Records ENC.</h1>
        </div>
        <nav>
          {/* Add navigation items here */}
        </nav>
        {auth?.isAuthenticated ? (
          <button
            style={buttonStyle}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <button
            style={buttonStyle}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
      </div>
      {isSignInOpen && <SignInPage onClose={handleCloseSignIn} />}
    </header>
  );
};

export default Header;
