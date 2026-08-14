import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { supabase } from "./supabaseClient";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [donors, setDonors] = useState([]);

  const [requestedBloodData, setRequestedBloodData] = useState({
    name: "",
    bloodGroup: "",
    division: "",
  });

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

  const matchedDonorsData = donors
    .filter((donor) => donor.available === true)
    .filter((donor) => {
      const compatible =
        bloodCompatibility[requestedBloodData.bloodGroup];

      return compatible?.includes(donor.bloodGroup);
    })
    .map((donor) => {

      let score = 40;

      if (
        donor.bloodGroup ===
        requestedBloodData.bloodGroup
      ) {
        score = 60;
      }

      if (
        donor.division ===
        requestedBloodData.division
      ) {
        score += 25;
      }

      score += 15;

      return {
        ...donor,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

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