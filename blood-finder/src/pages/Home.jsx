import React from "react";
import { Link } from "react-router-dom";

const Home = ({ donorCount = 0 }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background decorations */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#605DFF]/20 blur-3xl" />

        <div className="absolute top-80 -left-40 w-[450px] h-[450px] rounded-full bg-red-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ================= LEFT ================= */}

            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold mb-7">

                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

                Every donation can save a life

              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">

                Find the right blood.

                <span className="block mt-3 text-[#605DFF]">
                  When it matters.
                </span>

              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-slate-300">
                BloodFinder makes it easier to discover compatible
                blood donors near you. Search, register and connect
                with donors in just a few clicks.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-9">

                <Link
                  to="/find"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    h-14
                    px-8
                    rounded-xl
                    bg-[#605DFF]
                    hover:bg-[#514DFF]
                    text-white
                    font-bold
                    text-base
                    shadow-[0_15px_40px_rgba(96,93,255,0.35)]
                    transition-all
                    hover:-translate-y-0.5
                  "
                >
                  Find a Donor →
                </Link>

                <Link
                  to="/register"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    h-14
                    px-8
                    rounded-xl
                    bg-white
                    hover:bg-slate-100
                    text-slate-900
                    font-bold
                    text-base
                    transition-all
                    hover:-translate-y-0.5
                  "
                >
                  Become a Donor
                </Link>

              </div>

              {/* ================= STATS ================= */}

              <div className="flex items-center gap-7 sm:gap-10 mt-12">

                {/* Donors */}
                <div>
                  <p className="text-3xl font-bold text-white">
                    {donorCount}+
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Registered Donors
                  </p>
                </div>

                <div className="w-px h-12 bg-slate-700" />

                {/* Divisions */}
                <div>
                  <p className="text-3xl font-bold text-white">
                    8
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Divisions
                  </p>
                </div>

                <div className="w-px h-12 bg-slate-700" />

                {/* Blood groups */}
                <div>
                  <p className="text-3xl font-bold text-white">
                    8
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Blood Groups
                  </p>
                </div>

              </div>

            </div>

            {/* ================= RIGHT VISUAL ================= */}

            <div className="relative hidden lg:flex justify-center">

              <div className="relative w-[450px] h-[450px]">

                {/* Rotated background */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-[3rem]
                    bg-gradient-to-br
                    from-[#605DFF]/30
                    to-red-500/10
                    rotate-6
                    border
                    border-white/10
                  "
                />

                {/* Main card */}
                <div
                  className="
                    absolute
                    inset-4
                    rounded-[2.5rem]
                    bg-slate-900
                    border
                    border-slate-700
                    shadow-2xl
                    flex
                    flex-col
                    items-center
                    justify-center
                  "
                >

                  {/* Blood icon */}
                  <div className="
                    w-32
                    h-32
                    rounded-full
                    bg-red-500/10
                    border
                    border-red-500/20
                    flex
                    items-center
                    justify-center
                    mb-7
                  ">
                    <span className="text-7xl text-red-500">
                      ♥
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-white">
                    BloodFinder
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Connecting donors with lives
                  </p>

                  {/* Blood groups */}
                  <div className="mt-8 flex flex-wrap justify-center gap-2 px-6">

                    <span className="
                      px-4 py-2
                      rounded-lg
                      bg-red-500/10
                      border border-red-500/20
                      text-red-400
                      font-bold
                    ">
                      O+
                    </span>

                    <span className="
                      px-4 py-2
                      rounded-lg
                      bg-[#605DFF]/10
                      border border-[#605DFF]/20
                      text-[#8b88ff]
                      font-bold
                    ">
                      A+
                    </span>

                    <span className="
                      px-4 py-2
                      rounded-lg
                      bg-red-500/10
                      border border-red-500/20
                      text-red-400
                      font-bold
                    ">
                      B+
                    </span>

                    <span className="
                      px-4 py-2
                      rounded-lg
                      bg-[#605DFF]/10
                      border border-[#605DFF]/20
                      text-[#8b88ff]
                      font-bold
                    ">
                      AB+
                    </span>

                  </div>

                  {/* Status */}
                  <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">

                    <span className="w-2 h-2 rounded-full bg-green-500" />

                    Donor network active

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-4 py-20">

          {/* Heading */}

          <div className="text-center max-w-2xl mx-auto mb-14">

            <p className="text-[#8b88ff] font-bold text-sm uppercase tracking-widest">
              Why BloodFinder
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              Everything you need to find blood
            </h2>

            <p className="text-slate-400 mt-4 leading-relaxed">
              A simple platform designed to make the donor
              discovery process fast, reliable and accessible.
            </p>

          </div>


          {/* Feature cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Search */}

            <div className="
              p-8
              rounded-2xl
              bg-slate-900
              border border-slate-800
              hover:border-[#605DFF]/40
              hover:-translate-y-1
              transition-all
              duration-300
            ">

              <div className="
                w-14
                h-14
                rounded-xl
                bg-[#605DFF]/10
                border border-[#605DFF]/20
                flex
                items-center
                justify-center
                text-2xl
                mb-6
              ">
                🔎
              </div>

              <h3 className="text-xl font-bold text-white">
                Smart Search
              </h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Search donors using their name, phone number,
                blood group and division.
              </p>

            </div>


            {/* Compatibility */}

            <div className="
              p-8
              rounded-2xl
              bg-slate-900
              border border-slate-800
              hover:border-red-500/30
              hover:-translate-y-1
              transition-all
              duration-300
            ">

              <div className="
                w-14
                h-14
                rounded-xl
                bg-red-500/10
                border border-red-500/20
                flex
                items-center
                justify-center
                text-2xl
                mb-6
              ">
                🩸
              </div>

              <h3 className="text-xl font-bold text-white">
                Blood Compatibility
              </h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Find donors based on compatible blood groups
                instead of relying only on exact matches.
              </p>

            </div>


            {/* Matching */}

            <div className="
              p-8
              rounded-2xl
              bg-slate-900
              border border-slate-800
              hover:border-amber-500/30
              hover:-translate-y-1
              transition-all
              duration-300
            ">

              <div className="
                w-14
                h-14
                rounded-xl
                bg-amber-500/10
                border border-amber-500/20
                flex
                items-center
                justify-center
                text-2xl
                mb-6
              ">
                ⚡
              </div>

              <h3 className="text-xl font-bold text-white">
                Smart Matching
              </h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Our matching system ranks available donors based
                on blood group and location.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="max-w-7xl mx-auto px-4 py-20">

        <div className="
          relative
          overflow-hidden
          rounded-[2rem]
          bg-gradient-to-br
          from-[#605DFF]
          to-[#4037c9]
          px-8
          py-16
          md:px-16
          text-center
        ">

          {/* Decorations */}

          <div className="
            absolute
            -top-24
            -right-24
            w-72
            h-72
            rounded-full
            bg-white/10"
          />

          <div className="
            absolute
            -bottom-28
            -left-24
            w-80
            h-80
            rounded-full
            bg-white/10
          "/>

          <div className="relative">

            <p className="text-indigo-200 font-bold text-sm tracking-widest">
              MAKE A DIFFERENCE
            </p>

            <h2 className="
              text-4xl
              md:text-5xl
              font-bold
              text-white
              mt-3
            ">
              Your blood can save a life.
            </h2>

            <p className="
              text-indigo-100
              max-w-2xl
              mx-auto
              mt-5
              text-lg
              leading-relaxed
            ">
              Become a registered donor today and help someone
              find the blood they need.
            </p>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                mt-8
                px-8
                h-14
                rounded-xl
                bg-white
                text-[#5047d9]
                font-bold
                hover:bg-slate-100
                transition-all
                shadow-xl
              "
            >
              Become a Donor →
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="
        border-t
        border-slate-800
        py-8
        text-center
      ">

        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} BloodFinder. All rights reserved.
        </p>

        <p className="text-slate-500 text-sm mt-2">
          Built and maintained by{" "}
          <span className="font-semibold text-[#8b88ff]">
            Fakibazz
          </span>
        </p>

      </footer>

    </div>
  );
};

export default Home;