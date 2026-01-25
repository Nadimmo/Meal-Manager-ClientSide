import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import useAxiosPublic from "../components/Hooks/useAxiosPublic";

const GoogleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  const profileUpdate = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // get and set token
      if (currentUser) {
        axiosPublic.post("/jwt", { email: currentUser.email }).then((data) => {
          console.log(data.data.token);
          localStorage.setItem("access-token", data.data.token);
          setLoading(false);
        });
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    signUp,
    signIn,
    logOut,
    profileUpdate,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
