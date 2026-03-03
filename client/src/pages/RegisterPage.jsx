import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import API from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "user",
    name: "",
    email: "",
    phone: "",
    vehicleModel: "",
    vehicleNumber: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { role, name, email, phone, password, confirmPassword, vehicleModel, vehicleNumber } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (role === "driver" && (!vehicleModel || !vehicleNumber)) {
      alert("Please fill all vehicle information for Driver");
      return;
    }

    try {
      const payload = {
        name,
        email,
        phone,
        password,
        role,
        ...(role === "driver" && {
          vehicleDetails: {
            vehicleType: vehicleModel,
            vehicleNumber: vehicleNumber
          }
        })
      };

      const res = await API.post("/users/register", payload);
      alert(res.data.message);


      // Reset
      setFormData({
        role: "user",
        name: "",
        email: "",
        phone: "",
        vehicleModel: "",
        vehicleNumber: "",
        password: "",
        confirmPassword: "",
      });


      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen flex flex-col font-[Inter]">
      {/* Navbar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#f5c400] p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-900 text-2xl">
                local_taxi
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">UCab</h1>
          </div>
          <nav className="flex items-center gap-6">
            <NavLink className="text-sm font-medium text-slate-600 hover:text-[#f5c400] transition-colors" to="/login">
              Login
            </NavLink>
            <NavLink className="text-sm font-semibold text-slate-900 border-b-2 border-[#f5c400] pb-0.5" to="/register">
              Register
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden">
          {/* Card Header */}
          <div className="pt-10 pb-6 px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5c400]/10 rounded-full mb-4">
              <span className="material-symbols-outlined text-[#f5c400] text-4xl">person_add</span>
            </div>
            <h2 className="text-2xl font-bold">Create your UCab Account</h2>
            <p className="text-slate-500 mt-2">Join the modern way to ride and drive</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-6">
            {/* Role Selector */}
            <div className="bg-slate-50 p-1 rounded-lg flex gap-1">
              <label className="flex-1 cursor-pointer">
                <input
                  className="peer sr-only"
                  name="role"
                  type="radio"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <div className="py-2.5 text-center rounded-md text-sm font-semibold transition-all peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-[#f5c400] text-slate-500">
                  Rider
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  className="peer sr-only"
                  name="role"
                  type="radio"
                  value="driver"
                  checked={formData.role === "driver"}
                  onChange={handleChange}
                />
                <div className="py-2.5 text-center rounded-md text-sm font-semibold transition-all peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-[#f5c400] text-slate-500">
                  Driver
                </div>
              </label>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  person
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                />
              </div>
            </div>

            {/* Driver Vehicle Fields */}
            {formData.role === "driver" && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Vehicle Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="vehicleModel"
                    placeholder="Vehicle Model"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                  {/* <input
                    type="text"
                    name="licenseNumber"
                    placeholder="License Number"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg col-span-1 sm:col-span-2"
                  /> */}
                </div>
              </div>
            )}

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 relative">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                  />
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock_clock
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                  />
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#f5c400] hover:bg-[#f5c400]/90 text-slate-900 font-bold py-4 rounded-lg shadow-lg shadow-[#f5c400]/20 transition-all active:scale-[0.98] mt-4"
            >
              Create Account
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-slate-400 mt-6">
              By clicking "Create Account", you agree to our{" "}
              <a className="underline hover:text-[#f5c400]" href="#">Terms of Service</a> and{" "}
              <a className="underline hover:text-[#f5c400]" href="#">Privacy Policy</a>.
            </p>
          </form>

          {/* Footer */}
          <div className="bg-slate-50 py-6 px-8 text-center border-t border-slate-100">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <NavLink className="text-[#f5c400] font-bold hover:underline ml-1" to="/login">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#f5c400]">help</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#f5c400]">language</span>
        </div>
        <p className="text-slate-400 text-xs tracking-wider uppercase">
          © 2026 UCab Inc. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}