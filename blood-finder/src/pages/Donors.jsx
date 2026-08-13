import { useState } from "react";
import { Link } from "react-router-dom";
import DonorList from "../components/DonorList";

const Donors = () => {
  const [donors, setDonors] = useState([]);

  const divisions = [
    "Barishal",
    "Chattogram",
    "Dhaka",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
  ];

  const bloodGroups = [
    "O-",
    "O+",
    "A-",
    "A+",
    "B-",
    "B+",
    "AB-",
    "AB+",
  ];

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================
          PAGE HERO
      ========================= */}

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#605DFF] to-[#4037c9] px-8 py-14 md:px-14 md:py-16 mb-10">

        {/* Decorations */}

        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-white/10" />

        <div className="absolute top-10 right-20 w-4 h-4 rounded-full bg-white/20" />

        <div className="absolute bottom-16 right-40 w-7 h-7 rounded-full bg-white/10" />

        {/* Content */}

        <div className="relative z-10 max-w-3xl">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">

            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />

            BloodFinder Donor Network

          </div>

          {/* Heading */}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">

            Find a donor.

            <span className="block text-indigo-200">
              Save a life.
            </span>

          </h1>

          {/* Description */}

          <p className="mt-5 text-lg md:text-xl text-indigo-100 leading-relaxed max-w-2xl">

            Explore our registered blood donors and find the
            right person when someone needs blood. Search by
            name, phone number, blood group, or division.

          </p>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <Link
              to="/find"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white text-[#5047d9] font-bold hover:bg-slate-100 transition shadow-lg"
            >
              Find a Donor →
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            >
              Become a Donor
            </Link>

          </div>

        </div>

      </section>

      {/* =========================
          DONOR LIST SECTION
      ========================= */}

      <section>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">

          <div>

            <p className="text-[#605DFF] font-bold text-sm uppercase tracking-widest">
              Donor Directory
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
              Registered Donors
            </h2>

            <p className="text-slate-500 mt-2">
              Browse and filter available blood donors.
            </p>

          </div>

          <div className="flex items-center gap-2">

            <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-100">

              <span className="text-red-500 font-bold">
                🩸
              </span>

              <span className="ml-2 text-sm font-semibold text-red-600">
                Blood saves lives
              </span>

            </div>

          </div>

        </div>

        {/* Existing donor functionality */}

        <DonorList
          divisions={divisions}
          bloodGroups={bloodGroups}
          donors={donors}
          setDonors={setDonors}
        />

      </section>

      {/* =========================
          BOTTOM CTA
      ========================= */}

      <section className="py-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-200 px-8 py-12 md:px-14">

          {/* Decoration */}

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-indigo-100/70" />

          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-red-100/50" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="max-w-2xl">

              <p className="text-red-500 font-bold text-sm tracking-widest">
                BECOME A LIFESAVER
              </p>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                Don't just search for a donor.
                <span className="text-[#605DFF]">
                  {" "}Become one.
                </span>
              </h2>

              <p className="text-slate-500 mt-4 leading-relaxed">
                Register yourself with BloodFinder and help
                someone find the blood they need in an
                emergency.
              </p>

            </div>

            <Link
              to="/register"
              className="shrink-0 inline-flex items-center justify-center h-13 px-7 rounded-xl bg-[#605DFF] hover:bg-[#5047e5] text-white font-bold transition shadow-lg shadow-indigo-200"
            >
              Register as Donor →
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Donors;