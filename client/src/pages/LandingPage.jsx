import React from 'react'

export const LandingPage = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

        {/* ================= NAVBAR ================= */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 lg:px-20">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <span className="material-symbols-outlined text-4xl">local_taxi</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">CityRide</h2>
          </div>

          <nav className="hidden md:flex flex-1 justify-center gap-8">
            <a className="text-sm font-semibold hover:text-primary" href="#">Home</a>
            <a className="text-sm font-semibold hover:text-primary" href="#services">Services</a>
            <a className="text-sm font-semibold hover:text-primary" href="#features">Features</a>
            <a className="text-sm font-semibold hover:text-primary" href="#">Support</a>
          </nav>

          <div className="flex gap-3">
            <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-5 text-sm font-bold bg-slate-100 dark:bg-slate-800">
              Login
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold">
              Sign Up
            </button>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center px-4 py-12 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-background-dark/40 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWe-3QPzY1W2df9AxbxdR_ftUy1_rIlgbhvA4heMWTpst77sk8JcQ4z7yPjK08ptPeL8mffwu4rLGLq3svBfqCsAX-Taipk-a49xsmHfaoJTYdLT4BOq7Hmmaa4Q6n5nG783X-jSvqUtWxtnofId2vXeC8KzZPTHUHKRSKvq4WbRr01_C4N7A9pJ0s2obYTl_ZwjqEA-wL1O91xSdAegtGVZLiK5JPsTLWiUtcLWLp7FVNe86U12o_HoEl4Nyq4P4BEaAnuy7xmtms"
              alt="Car"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-white text-5xl lg:text-7xl font-black">
                Your Reliable Ride, <span className="text-accent-yellow">Anytime, Anywhere.</span>
              </h1>
              <p className="text-slate-200 text-lg max-w-lg">
                Experience the best-in-class cab service with fixed pricing and professional drivers.
              </p>
            </div>

            {/* Booking Card */}
            <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl shadow-2xl border">
              <h3 className="text-xl font-bold mb-4">Book Your Trip</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="p-3 rounded-lg border" placeholder="Pickup Location" />
                <input className="p-3 rounded-lg border" placeholder="Drop-off Location" />
                <input className="p-3 rounded-lg border" type="date" />
                <input className="p-3 rounded-lg border" type="time" />
              </div>

              <button className="mt-5 w-full py-4 bg-accent-yellow font-black rounded-xl">
                Book Now
              </button>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="py-20 px-6 lg:px-20 bg-white dark:bg-slate-900/50">
          <h2 className="text-4xl font-black text-center mb-12">Our Premium Services</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: "directions_car", title: "City Rides" },
              { icon: "flight_takeoff", title: "Airport Transfers" },
              { icon: "distance", title: "Outstation Trips" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background-light dark:bg-slate-800 border">
                <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                <h3 className="text-xl font-bold mt-4">{item.title}</h3>
                <p className="text-slate-500 mt-2">Reliable and comfortable travel experience.</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-white dark:bg-background-dark border-t px-6 lg:px-20 py-10 text-sm text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
            <p>© 2024 CityRide Global Inc.</p>
            <div className="flex gap-6">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
