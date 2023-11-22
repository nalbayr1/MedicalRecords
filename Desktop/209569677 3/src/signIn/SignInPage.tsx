import React, { useState, CSSProperties } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // Make sure to install react-router-dom if you haven't

interface SignInPageProps {
  onClose: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Retrieve user type from Firestore
      const userDocRef = doc(firestore, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.userType === 'doctor') {
          navigate('/doctorScreen/doctorsHomePage'); // Redirect to the doctor's home page
        } else if (userData.userType === 'patient') {
          navigate('/PatientScreen/patientScreenHomePage'); // Redirect to the patient's home page
        }
      } else {
        console.log('No user data found!');
      }

      onClose(); // Close the sign-in modal
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Sign in error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registered user:', userCredential.user);
      // Create a user document in Firestore
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        email: email, // Optional, since the email is already stored in the auth user record
        userType: userType,
      });
      onClose(); // Close the registration modal
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };


  const pageStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#f0f2f5',
    zIndex: 1000,
  };

  const formStyle: CSSProperties = {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px',
  };

  const closeButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const inputStyle: CSSProperties = {
    margin: '10px 0',
    padding: '10px',
    width: '90%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle: CSSProperties = {
    marginTop: '20px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#1877f2',
    color: 'white',
    width: '90%',
    cursor: 'pointer',
  };

  const textStyle: CSSProperties = {
    marginTop: '20px',
    color: 'black',
    cursor: 'pointer',
  };

  const renderForm = () => (
    <>
      <h2 style={{ margin: '0 0 20px 0', color: 'black' }}>
        {isRegistering ? 'Register' : 'Sign In'}
      </h2>
      <select
        style={inputStyle}
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        required
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <input
        style={inputStyle}
        type="email"
        placeholder="Email or phone number"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {isRegistering ? (
        <button style={buttonStyle} onClick={handleRegister}>Register</button>
      ) : (
        <button style={buttonStyle} onClick={handleSignIn}>Sign In</button>
      )}
      <span style={textStyle} onClick={toggleRegister}>
        {isRegistering ? 'Have an account? Sign In' : 'Create New Account'}
      </span>
    </>
  );

  return (
    <div style={pageStyle}>
      <div style={formStyle}>
        <button style={closeButtonStyle} onClick={onClose}>&times;</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {renderForm()}
      </div>
    </div>
  );
};

export default SignInPage;