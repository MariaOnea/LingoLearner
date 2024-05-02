import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig'; // Ensure you import your Firebase auth configuration

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user); // Update state when user logs in or out
        });

        return unsubscribe; // Clean up subscription on unmount
    }, []);

    // Define the logout function
    const logout = () => {
        signOut(auth).then(() => {
            console.log("User signed out successfully");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    // The value object that you pass to the AuthContext.Provider
    const value = {
        currentUser,
        logout // Make logout function available throughout your app
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
