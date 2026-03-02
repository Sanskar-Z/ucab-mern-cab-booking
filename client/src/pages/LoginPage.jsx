import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function LoginPage() {
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

            <form className="space-y-5">
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
                  <button
                    type="button"
                    className="text-xs font-medium text-[#f5c400] hover:underline"
                    onClick={() => alert("Optional feature")}
                  >
                    Forgot password?
                  </button>
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
                  />
                </div>
              </div>

              <div className="flex items-center px-1">
                <input
                  className="h-4 w-4 text-[#f5c400] focus:ring-[#f5c400] border-slate-300 rounded"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-slate-600"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>

              <button
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-[#f5c400] hover:bg-[#f5c400]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5c400] transition-all"
                type="submit"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="sr-only">Sign in with Google</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.32-2.12 4.52-1.2 1.2-2.84 1.84-5.72 1.84-4.48 0-8.08-3.6-8.08-8.08s3.6-8.08 8.08-8.08c2.44 0 4.28.96 5.6 2.24l2.32-2.32C18.48 2.48 15.68 1 12.48 1 6.8 1 2.12 5.68 2.12 11.36s4.68 10.36 10.36 10.36c3.16 0 5.6-1.04 7.48-3.04 1.92-1.92 2.52-4.64 2.52-6.96 0-.52-.04-1.04-.12-1.52h-9.88z" />
                </svg>
              </button>

              <button className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="sr-only">Sign in with Apple</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.96.95-2.04 2.04-3.56 2.04-1.48 0-2.03-.94-3.79-.94-1.78 0-2.4.91-3.76.94-1.45.03-2.65-1.25-3.63-2.65-2.01-2.84-3.53-8.04-1.46-11.64 1.03-1.78 2.86-2.91 4.86-2.94 1.51-.03 2.94 1.02 3.86 1.02.92 0 2.69-1.26 4.52-1.07 1.83.19 3.23.86 4.14 2.2-2.02 1.22-1.71 3.94.31 5.08 1.13.62 2.54 1.48 2.5 3-.01.04-2.5 8.96-4 8.96zm-4.32-17.15c.81-1.08 1.34-2.58 1.19-4.07-1.3.05-2.87.86-3.8 1.94-.83.97-1.55 2.5-1.36 3.93 1.45.11 2.94-.74 3.97-1.8z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-center">
            <p className="text-sm text-slate-600">
              Don’t have an account?
              <Link
                className="font-bold text-slate-900 hover:text-[#f5c400] transition-colors ml-1"
                to="/register"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}