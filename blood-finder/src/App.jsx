import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { supabase } from "./supabaseClient";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DonorList from "./components/DonorList";
import DonorRegistry from "./components/DonorRegistry";
import DonorFind from "./components/DonorFind";
import AIScoreResult from "./components/AIScoreResult";

// Pages
import Home from "./pages/Home";

function App() {
  // ==============================
  // DONOR STATE
  // ==============================

  const [donors, setDonors] = useState([]);

  // ==============================
  // BLOOD REQUEST STATE
  // ==============================

  const [requestedBloodData, setRequestedBloodData] = useState({
    name: "",
    bloodGroup: "",
    division: "",
  });

  // ==============================
  // DIVISIONS
  // ==============================

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

  // ==============================
  // BLOOD GROUPS
  // ==============================

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

  // ==============================
  // BLOOD COMPATIBILITY
  // ==============================

  const bloodCompatibility = {
    "O-": ["O-"],

    "O+": ["O-", "O+"],

    "A-": ["O-", "A-"],

    "A+": ["O-", "O+", "A-", "A+"],

    "B-": ["O-", "B-"],

    "B+": ["O-", "O+", "B-", "B+"],

    "AB-": ["O-", "A-", "B-", "AB-"],

    "AB+": [
      "O-",
      "O+",
      "A-",
      "A+",
      "B-",
      "B+",
      "AB-",
      "AB+",
    ],
  };

  // ==============================
  // FETCH DONORS FROM SUPABASE
  // ==============================

  useEffect(() => {
    const fetchDonors = async () => {
      const { data, error } = await supabase
        .from("donors")
        .select("*");

      if (error) {
        console.error("Error fetching donors:", error);
        return;
      }

      const formattedDonors = (data || []).map((donor) => ({
        id: donor.id,
        name: donor.name,
        bloodGroup: donor.blood_group,
        division: donor.division,
        phone: donor.phone,
        available: donor.available,
      }));

      setDonors(formattedDonors);
    };

    fetchDonors();
  }, []);

  // ==============================
  // FIND MATCHED DONORS
  // ==============================

  const matchedDonors = () => {
    if (!requestedBloodData.bloodGroup) {
      return [];
    }

    const compatibleGroups =
      bloodCompatibility[requestedBloodData.bloodGroup];

    if (!compatibleGroups) {
      return [];
    }

    const matched = donors
      // Only available donors
      .filter((donor) => donor.available === true)

      // Compatible blood groups
      .filter((donor) =>
        compatibleGroups.includes(donor.bloodGroup)
      )

      // Calculate score
      .map((donor) => {
        let score = 0;

        // Exact blood group
        if (
          donor.bloodGroup ===
          requestedBloodData.bloodGroup
        ) {
          score += 60;
        } else {
          score += 40;
        }

        // Same division
        if (
          requestedBloodData.division &&
          donor.division === requestedBloodData.division
        ) {
          score += 25;
        }

        // Available
        if (donor.available === true) {
          score += 15;
        }

        return {
          ...donor,
          score,
        };
      })

      // Highest score first
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        // Same division first
        const aSameDivision =
          a.division === requestedBloodData.division;

        const bSameDivision =
          b.division === requestedBloodData.division;

        if (aSameDivision !== bSameDivision) {
          return bSameDivision - aSameDivision;
        }

        // Exact blood group first
        const aExact =
          a.bloodGroup === requestedBloodData.bloodGroup;

        const bExact =
          b.bloodGroup === requestedBloodData.bloodGroup;

        return bExact - aExact;
      })

      // Show maximum 10
      .slice(0, 10);

    return matched;
  };

  const matchedDonorsData = matchedDonors();

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col overflow-x-hidden">

        {/* ==============================
            HEADER
        ============================== */}

        <Header />

        {/* ==============================
            MAIN CONTENT
        ============================== */}

        <main className="flex-1 w-full">

          <Routes>

            {/* ==========================
                HOME
            ========================== */}

            <Route
              path="/"
              element={
                <Home donorCount={donors.length} />
              }
            />

            {/* ==========================
                REGISTER
            ========================== */}

            <Route
              path="/register"
              element={
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                  <DonorRegistry
                    divisions={divisions}
                    bloodGroups={bloodGroups}
                    donors={donors}
                    setDonors={setDonors}
                  />
                </div>
              }
            />

            {/* ==========================
                DONOR LIST
            ========================== */}

            <Route
              path="/donors"
              element={
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                  <DonorList
                    divisions={divisions}
                    bloodGroups={bloodGroups}
                    donors={donors}
                    setDonors={setDonors}
                  />
                </div>
              }
            />

            {/* ==========================
                FIND DONOR
            ========================== */}

            <Route
              path="/find"
              element={
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

                  <div className="space-y-6 sm:space-y-10">

                    <DonorFind
                      bloodGroups={bloodGroups}
                      divisions={divisions}
                      requestedBloodData={requestedBloodData}
                      setRequestedBloodData={
                        setRequestedBloodData
                      }
                      matchedDonorsCount={matchedDonorsData.length}
                    />

                    <AIScoreResult
                      matchedDonorsData={matchedDonorsData}
                    />

                  </div>

                </div>
              }
            />

          </Routes>

        </main>

        {/* ==============================
            FOOTER
        ============================== */}

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;