import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [role, setRole] = useState("user"); // "user" or "driver"

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
            <Link
              className="text-sm font-medium text-slate-600 hover:text-[#f5c400] transition-colors"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-sm font-semibold text-slate-900 border-b-2 border-[#f5c400] pb-0.5"
              to="/register"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden">
          {/* Card Header */}
          <div className="pt-10 pb-6 px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5c400]/10 rounded-full mb-4">
              <span className="material-symbols-outlined text-[#f5c400] text-4xl">
                person_add
              </span>
            </div>
            <h2 className="text-2xl font-bold">Create your UCab Account</h2>
            <p className="text-slate-500 mt-2">
              Join the modern way to ride and drive
            </p>
          </div>

          {/* Registration Form */}
          <form className="px-8 pb-10 space-y-6">
            {/* Role Selector */}
            <div className="bg-slate-50 p-1 rounded-lg flex gap-1">
              <label className="flex-1 cursor-pointer">
                <input
                  className="peer sr-only"
                  name="role"
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
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
                  checked={role === "driver"}
                  onChange={() => setRole("driver")}
                />
                <div className="py-2.5 text-center rounded-md text-sm font-semibold transition-all peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-[#f5c400] text-slate-500">
                  Driver
                </div>
              </label>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    person
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                    placeholder="John Doe"
                    type="text"
                    name="name"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    mail
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                    placeholder="john@example.com"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    call
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                    placeholder="+91 98765 43210"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* Driver Vehicle Fields — only shown when role === "driver" */}
            {role === "driver" && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Vehicle Model
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                      placeholder="Toyota Camry"
                      type="text"
                      name="vehicleModel"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Vehicle Number
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                      placeholder="MH-12-AB-1234"
                      type="text"
                      name="vehicleNumber"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      License Number
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                      placeholder="DL-987654321"
                      type="text"
                      name="licenseNumber"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock_clock
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5c400]/50 focus:border-[#f5c400] text-slate-900 transition-all"
                    placeholder="••••••••"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              className="w-full bg-[#f5c400] hover:bg-[#f5c400]/90 text-slate-900 font-bold py-4 rounded-lg shadow-lg shadow-[#f5c400]/20 transition-all active:scale-[0.98] mt-4"
              type="submit"
            >
              Create Account
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-slate-400 mt-6">
              By clicking "Create Account", you agree to our{" "}
              <a className="underline hover:text-[#f5c400]" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline hover:text-[#f5c400]" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </form>

          {/* Footer */}
          <div className="bg-slate-50 py-6 px-8 text-center border-t border-slate-100">
            <p className="text-slate-600 text-sm">
              Already have an account?
              <Link
                className="text-[#f5c400] font-bold hover:underline ml-1"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#f5c400]">
            help
          </span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#f5c400]">
            language
          </span>
        </div>
        <p className="text-slate-400 text-xs tracking-wider uppercase">
          © 2024 UCab Inc. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}