import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen font-[Inter]">

      <header className="flex items-center justify-between px-6 md:px-10 py-4 sticky top-0 z-50 bg-white/50">
        <div className="flex items-center gap-2 select-none">
          <div className="size-9 flex items-center justify-center bg-[#f5c400] rounded-lg">
            <span className="material-symbols-outlined text-slate-900 !text-2xl">
              local_taxi
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            UCab
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold hover:text-[#f5c400] transition-colors">
            Features
          </a>
          <a href="#services" className="text-sm font-semibold hover:text-[#f5c400] transition-colors">
            Services
          </a>
          <NavLink
            to="/login"
            className="text-sm font-semibold text-slate-600 hover:text-[#f5c400]"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="bg-[#f5c400] hover:bg-yellow-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
          >
            Sign Up
          </NavLink>
        </nav>
      </header>

      <section className="relative flex items-center justify-center text-center px-6 md:px-10 py-28 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80')"
          }}
        />


        <div className="absolute inset-0 bg-black/50" />


        <div className="relative z-10 max-w-3xl space-y-6 text-white">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f5c400]/20 text-[#f5c400] rounded-full text-xs font-bold uppercase tracking-wider border border-[#f5c400]/40">
            Now Live in 24 Cities
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
            Smart Rides for <br />
            <span className="text-[#f5c400]">Modern Cities.</span>
          </h1>

          <p className="text-lg text-slate-200">
            Safe, affordable and sustainable rides — available in minutes.
            Experience premium mobility without the premium price.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <NavLink
              to="/login"
              className="flex items-center gap-2 bg-[#f5c400] hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">
                local_taxi
              </span>
              Book a Ride
            </NavLink>

            <a
              href="#features"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:border-[#f5c400] hover:text-[#f5c400] transition-colors"
            >
              Learn More
            </a>
          </div>

        </div>
      </section>


      <section id="features" className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {[
            { icon: "schedule", title: "Fast Pickup", desc: "Average wait time under 5 minutes in major cities." },
            { icon: "verified_user", title: "Safe & Secure", desc: "Verified drivers and real-time ride tracking." },
            { icon: "eco", title: "Eco Friendly", desc: "Hybrid and electric fleet options available." }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-[#f5c400]/40 transition-colors"
            >
              <div className="size-12 flex items-center justify-center bg-[#f5c400]/10 rounded-xl mb-5">
                <span className="material-symbols-outlined text-[#f5c400]">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      <section id="services" className="px-6 md:px-10 py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-6 mb-14">
          <h2 className="text-4xl font-black tracking-tight">
            Tailored for Every Journey
          </h2>
          <p className="text-slate-500">
            From daily commutes to business travel — we’ve got you covered.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {["Daily Commute", "Business Travel", "Airport Transfers"].map((service, i) => (
            <div
              key={i}
              className="bg-[#f8f8f5] p-8 rounded-2xl border border-slate-100 hover:border-[#f5c400]/40 transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">{service}</h3>
              <p className="text-sm text-slate-500">
                Comfortable rides designed around your schedule.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black tracking-tight">
            Ready to Ride?
          </h2>
          <p className="text-slate-500">
            Join thousands of riders who trust UCab every day.
          </p>

          <NavLink
            to="/login"
            className="inline-flex items-center gap-2 bg-[#f5c400] hover:bg-yellow-400 text-slate-900 px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
          >
            Get Started
          </NavLink>
        </div>
      </section>

      <footer className="py-10 px-6 md:px-10 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          © 2026 UCab Inc. All rights reserved.
        </p>
      </footer>

    </div>
  );
}