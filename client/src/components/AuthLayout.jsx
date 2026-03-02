import { Link } from "react-router-dom";

export default function AuthLayout({ children, active = "login" }) {
  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen flex flex-col font-[Inter]">
      <header className="w-full border-b border-black/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-[#f5c400] p-1.5 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-900 font-bold">
                  local_taxi
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight leading-none">
                UCab
              </span>
            </div>

            <nav className="flex items-center gap-6">
              <Link
                className={`text-sm font-medium hover:text-[#f5c400] transition-colors ${
                  active === "login" ? "text-[#f5c400]" : ""
                }`}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-sm font-medium px-4 py-2 rounded-lg bg-[#f5c400]/10 hover:bg-[#f5c400] hover:text-slate-900 transition-all"
                to="/register"
              >
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-10">
        <span className="material-symbols-outlined text-[160px] text-[#f5c400] select-none">
          local_taxi
        </span>
      </div>
    </div>
  );
}