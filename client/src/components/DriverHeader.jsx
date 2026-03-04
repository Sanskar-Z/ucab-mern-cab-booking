import { NavLink } from "react-router-dom";
import useLogout from "../services/useLogout";

export default function DriverHeader() {
    const logout = useLogout();

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#f5c400] text-3xl">
                            local_taxi
                        </span>
                        <span className="text-2xl font-bold tracking-tight">UCab</span>
                    </div>

                    <div className="hidden md:flex space-x-8 h-full items-center">
                        <NavLink
                            className="px-1 pt-1 text-sm font-semibold text-slate-900 border-b-2 border-[#f5c400] h-full flex items-center"
                            to="/driver/dashboard"
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            className="px-1 pt-1 text-sm font-medium text-slate-500 hover:text-[#f5c400] transition-colors"
                            to="/driver/history"
                        >
                            History
                        </NavLink>
                        <button onClick={logout} className="px-1 pt-1 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors">
                            Logout
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button className="p-2 text-slate-600">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>

    );
}