import { createClient } from "@supabase/supabase-js";
import { log } from "firebase/firestore/pipelines";
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { data } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        },
      );

      return () => listener.subscription.unsubscribe();
    }, []);

  //  Email signup
    const signUp = async (email, password) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      setLoading(false);
      return { data, error };
    };

  //  Email login
    const signIn = async (email, password) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      return { data, error };
    };

  //  Google login
  //   const googleSignIn = async () => {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //     })
  //     return { error }
  //   }

  //  Logout
    const logOut = async () => {
      await supabase.auth.signOut();
      setUser(null);
    };

  const authInfo = {
    signUp,
    signIn,
    user,
    loading,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
