import DonorFind from "../components/DonorFind";
import { Link } from "react-router-dom";

const FindDonor = () => {
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
    <div className="relative">

      {/* =========================
          BACKGROUND DECORATIONS
      ========================= */}

      <div className="fixed top-20 right-0 -z-10 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      <div className="fixed bottom-20 left-0 -z-10 w-96 h-96 rounded-full bg-red-100/30 blur-3xl pointer-events-none" />

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-12">

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#605DFF] to-[#4037c9] px-8 py-10 md:px-14 md:py-12">

          {/* Decorations */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute top-8 right-32 w-3 h-3 rounded-full bg-white/20" />

          <div className="absolute bottom-10 right-20 w-5 h-5 rounded-full bg-white/10" />

          {/* Content */}

          <div className="relative z-10 max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-5 backdrop-blur-sm">

              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />

              BloodFinder Matching

            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">

              Find a compatible
              <span className="block text-indigo-200">
                blood donor.
              </span>

            </h1>

            <p className="mt-4 text-indigo-100 text-lg leading-relaxed max-w-2xl">

              Enter your blood requirement and location.
              BloodFinder will search for available compatible
              donors and prioritize the best matches.

            </p>

          </div>

        </div>

      </section>

      {/* =========================
          FIND DONOR FORM
      ========================= */}

      <main className="max-w-7xl mx-auto px-4">

        <DonorFind
          bloodGroups={bloodGroups}
          divisions={divisions}
        />

      </main>

      {/* =========================
          EMERGENCY NOTE
      ========================= */}

      <section className="max-w-6xl mx-auto px-4 pb-16">

        <div className="rounded-2xl bg-red-50 border border-red-100 p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center gap-5">

            <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-100 flex items-center justify-center">

              <span className="text-3xl">
                🩸
              </span>

            </div>

            <div>

              <h3 className="text-lg font-bold text-slate-900">
                Need blood urgently?
              </h3>

              <p className="text-slate-600 mt-1 leading-relaxed">
                Search for compatible donors and contact an
                available donor as soon as possible. Always
                verify the donor and blood requirements before
                transfusion.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          BOTTOM CTA
      ========================= */}

      <section className="max-w-7xl mx-auto px-4 pb-20">

        <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-200 px-8 py-12 md:px-14">

          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-100/70" />

          <div className="absolute -bottom-28 -left-24 w-72 h-72 rounded-full bg-red-100/50" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-7">

            <div className="max-w-2xl">

              <p className="text-[#605DFF] font-bold text-sm tracking-widest">
                BE PART OF THE NETWORK
              </p>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                Become a donor.
                <span className="text-red-500">
                  {" "}Save a life.
                </span>
              </h2>

              <p className="text-slate-500 mt-3 leading-relaxed">
                Register yourself with BloodFinder and make it
                easier for someone to find the blood they need.
              </p>

            </div>

            <Link
              to="/register"
              className="shrink-0 inline-flex items-center justify-center h-13 px-7 rounded-xl bg-[#605DFF] hover:bg-[#5047e5] text-white font-bold transition-all shadow-lg shadow-indigo-200"
            >
              Become a Donor →
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default FindDonor;