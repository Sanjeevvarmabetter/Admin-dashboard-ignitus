  import { getFirestore, doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  AUTHORIZED_USERS
} from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRecord, setUserRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Consolidate the onAuthStateChanged into a single effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          // Fetch user data from Firestore
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();

            // Check if user is blocked
            if (data.isBlocked) {
              await signOut(auth);
              setAuthError('Your account has been blocked by the admin.');
              setCurrentUser(null);
              setUserRecord(null);
              setLoading(false);
              return;
            }

            // Set user data in state
            setUserRecord(data);
            setCurrentUser(user);
          } else {
            setAuthError('No Firestore user record found.');
            await signOut(auth);
            setCurrentUser(null);
            setUserRecord(null);
          }
        } catch (error) {
          setAuthError('Failed to fetch user data from Firestore.');
          console.error("Error fetching user data:", error);
        }
      } else {
        // If no user is signed in
        setCurrentUser(null);
        setUserRecord(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Manual Email Whitelist Check
      if (!AUTHORIZED_USERS.includes(user.email)) {
        await signOut(auth);
        setAuthError('Email is not whitelisted to access this dashboard.');
        return false;
      }

      // Get Firestore user data
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await signOut(auth);
        setAuthError('No Firestore user record found. Access denied.');
        return false;
      }

      const data = userDoc.data();

      // Role Check
      if (data.role !== 'admin') {
        await signOut(auth);
        setAuthError('You are not authorized to access this dashboard.');
        return false;
      }

      setAuthError('');
      setUserRecord(data);
      setCurrentUser(user);
      return true;

    } catch (error) {
      setAuthError('Failed to sign in with Google');
      console.error("Google login error:", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserRecord(null);
    setAuthError('');
  };

  const value = {
    currentUser,
    userRecord,
    loginWithGoogle,
    logout,
    loading,
    authError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
