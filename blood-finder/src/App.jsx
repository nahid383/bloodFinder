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
  // Recipient → Compatible Donors
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
      try {
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

        console.log(
          "Donors loaded from Supabase:",
          formattedDonors
        );
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchDonors();
  }, []);

  // ==============================
  // FIND MATCHED DONORS
  // ==============================

  const matchedDonors = () => {
    // No blood group selected
    if (!requestedBloodData.bloodGroup) {
      return [];
    }

    // Get compatible blood groups
    const compatibleGroups =
      bloodCompatibility[requestedBloodData.bloodGroup];

    if (!compatibleGroups) {
      return [];
    }

    const matched = donors
      // Only available donors
      .filter((donor) => donor.available === true)

      // Only compatible blood groups
      .filter((donor) =>
        compatibleGroups.includes(donor.bloodGroup)
      )

      // Calculate matching score
      .map((donor) => {
        let score = 0;

        // Exact blood group
        if (
          donor.bloodGroup === requestedBloodData.bloodGroup
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

      // Sort by score
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

      // Maximum 10 donors
      .slice(0, 10);

    return matched;
  };

  const matchedDonorsData = matchedDonors();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">

        {/* ==============================
            HEADER
        ============================== */}

        <Header />

        {/* ==============================
            MAIN CONTENT
        ============================== */}

        <main className="flex-1">
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
                <div className="container mx-auto px-4 py-8">
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
                <div className="container mx-auto px-4 py-8">
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
                <div className="container mx-auto px-4 py-8 space-y-8">
                  <DonorFind
                    bloodGroups={bloodGroups}
                    divisions={divisions}
                    requestedBloodData={requestedBloodData}
                    setRequestedBloodData={
                      setRequestedBloodData
                    }
                  />

                  <AIScoreResult
                    matchedDonorsData={matchedDonorsData}
                  />
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