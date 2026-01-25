// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkfOvroHTy9bT-igTcX-_f9m4p0vMPNm4",
  authDomain: "meal-manager-ec502.firebaseapp.com",
  projectId: "meal-manager-ec502",
  storageBucket: "meal-manager-ec502.firebasestorage.app",
  messagingSenderId: "394423395372",
  appId: "1:394423395372:web:e91febc8ae2e51c4639d89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;