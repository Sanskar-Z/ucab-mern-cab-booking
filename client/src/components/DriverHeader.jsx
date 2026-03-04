import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../services/useLogout";
import { AuthContext } from "../context/AuthContext";

export default function DriverHeader() {
    const logout = useLogout();
    const { user } = useContext(AuthContext);

    return (
        <header className="w-full flex items-center justify-between border-b border-slate-200 bg-white px-6 md:px-10 py-3 sticky top-0 z-50 select-none">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="size-8 flex items-center justify-center bg-[#f5c400] rounded-lg">
                    <span className="material-symbols-outlined text-slate-900 !text-2xl">
                        local_taxi
                    </span>
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-tight">
                    UCab
                </h2>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                <nav className="flex items-center gap-8">
                    <NavLink
                        className="text-slate-900 text-sm font-semibold hover:text-[#f5c400] transition-colors"
                        to="/driver/dashboard"
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        className="text-slate-600 text-sm font-medium hover:text-[#f5c400] transition-colors"
                        to="/driver/history"
                    >
                        History
                    </NavLink>
                    <button
                        onClick={logout}
                        className="text-slate-600 text-sm font-medium hover:text-red-500 transition-colors"
                    >
                        Logout
                    </button>
                </nav>

                {/* Driver avatar */}
                <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
                    <div className="text-right">
                        <p className="text-xs font-bold">{user?.name || "Driver"}</p>
                        <p className="text-[10px] text-slate-500">Driver</p>
                    </div>
                    <div className="size-10 rounded-full bg-[#f5c400]/20 flex items-center justify-center border-2 border-[#f5c400]">
                        <span className="material-symbols-outlined text-[#f5c400]">
                            person
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
                <span className="material-symbols-outlined">menu</span>
            </button>
        </header>
    );
}