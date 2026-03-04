export default function DriverFooter() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm px-6">

                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f5c400] font-bold">
                        local_taxi
                    </span>

                    <span className="font-bold text-slate-900">UCab</span>

                    <span>© {new Date().getFullYear()} All rights reserved.</span>
                </div>

                <div className="flex gap-6">
                    <a
                        className="hover:text-[#f5c400] transition-colors"
                        href="#"
                    >
                        Privacy Policy
                    </a>

                    <a
                        className="hover:text-[#f5c400] transition-colors"
                        href="#"
                    >
                        Terms of Service
                    </a>

                    <a
                        className="hover:text-[#f5c400] transition-colors"
                        href="#"
                    >
                        Support
                    </a>
                </div>

            </div>
        </footer>
    );
}