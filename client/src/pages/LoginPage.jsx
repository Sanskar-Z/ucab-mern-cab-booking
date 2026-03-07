import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import API from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/users/login", formData);

      const loggedUser = res.data.data.user;

      setUser(loggedUser);

      alert("Login successful");

      if (loggedUser.role === "driver") {
        navigate("/driver/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      alert(error.response?.data.message);
    }
  };

  return (
    <AuthLayout active="login">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="size-16 bg-[#f5c400]/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#f5c400] text-4xl">
                  account_circle
                </span>
              </div>
              <h1 className="text-3xl font-bold">UCab</h1>
              <p className="text-slate-500 mt-2 text-center">
                Login to your account to book your next ride
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-slate-700 ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#f5c400]">
                    <span className="material-symbols-outlined text-[20px]">
                      mail
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] transition-all"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="text-sm font-semibold text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#f5c400]">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] transition-all"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>


              <button
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-[#f5c400] hover:bg-[#f5c400]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5c400] transition-all"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-center">
            <p className="text-sm text-slate-600">
              Don’t have an account?
              <NavLink
                className="font-bold text-slate-900 hover:text-[#f5c400] transition-colors ml-1"
                to="/register"
              >
                Register Now
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}