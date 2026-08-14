import { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { supabase } from "./supabaseClient";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

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
  // FETCH DONORS
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
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchDonors();
  }, []);

  // ==============================
  // MATCHED DONORS
  // ==============================

  const matchedDonorsData = useMemo(() => {
    // Don't calculate anything before blood group is selected
    if (!requestedBloodData.bloodGroup) {
      return [];
    }

    const compatibleGroups =
      bloodCompatibility[requestedBloodData.bloodGroup];

    if (!compatibleGroups) {
      return [];
    }

    return donors
      // Only available donors
      .filter((donor) => donor.available === true)

      // Compatible blood groups
      .filter((donor) =>
        compatibleGroups.includes(donor.bloodGroup)
      )

      // Calculate score
      .map((donor) => {
        let score = 40;

        // Exact blood group
        if (
          donor.bloodGroup ===
          requestedBloodData.bloodGroup
        ) {
          score += 20;
        }

        // Same division
        if (
          requestedBloodData.division &&
          donor.division === requestedBloodData.division
        ) {
          score += 25;
        }

        // Available
        score += 15;

        return {
          ...donor,
          score: Math.min(score, 100),
        };
      })

      // Highest score first
      .sort((a, b) => b.score - a.score)

      // Top 10
      .slice(0, 10);
  }, [
    donors,
    requestedBloodData.bloodGroup,
    requestedBloodData.division,
  ]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 overflow-x-hidden">

        <Header />

        <main className="flex-1 w-full">
          <AppRoutes
            donors={donors}
            setDonors={setDonors}
            divisions={divisions}
            bloodGroups={bloodGroups}
            requestedBloodData={requestedBloodData}
            setRequestedBloodData={setRequestedBloodData}
            matchedDonorsData={matchedDonorsData}
          />
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;