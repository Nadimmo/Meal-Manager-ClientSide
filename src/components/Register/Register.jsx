import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
  const { signUp, profileUpdate , googleSignIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userInfo = {
      fullName: formData.fullName,
      email: formData.email,
    };
  //  // Password match check 
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    signUp(formData.email, formData.password).then((userCredential) => {
      if (userCredential.user) {
        profileUpdate(formData.fullName)
        .then((res)=>{
        // send data info to backend
          axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            alert(
              "Registration successful!",
            );
            setFormData({
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            navigate("/");
          }
        });
        })
      }
    });
  };

  const handleGoogle = () => {
    // Implement Google Sign-In logic here
    googleSignIn()
    .then((result) => {
      const loggedUser = result.user;
      const userInfo = {
        fullName: loggedUser.displayName,
        email: loggedUser.email,
      };
      // send data info to backend
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId || res.data.alreadyExists) {
          alert(
            "Login successful!",
          );
          navigate("/");
        }
      });
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
    });
     

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Create Account
          </h2>
          <p className="text-slate-500 mt-2">Join the Meal Manager system</p>
          <p className="text-center text-sm text-slate-500 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="john@example.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all mt-4 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <button onClick={handleGoogle} className="btn bg-white text-black border-[#e5e5e5] w-full mt-2">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
