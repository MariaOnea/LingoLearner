import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

// Function to handle user logout
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("Logged out successfully");
        // You might redirect the user or perform other cleanup tasks here
    } catch (error) {
        console.error("Error logging out: ", error);
    }
};
