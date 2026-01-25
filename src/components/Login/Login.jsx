import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
  const {signIn}= useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
    .then((res)=>{
        alert("Login successful!");
        setEmail('');
        setPassword('')
        navigate('/');

    })
    .catch((error)=>{
      alert(`Error: ${error.message}`);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Log in to manage your mess meals</p>
          <p className="text-center text-sm text-slate-500 mt-2">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
        </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-600">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;