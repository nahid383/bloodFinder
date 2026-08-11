import { useState } from "react";

import DonorList from "./components/DonorList";
import DonorRegistry from "./components/DonorRegistry";
import DonorFind from "./components/DonorFind";
import Header from "./components/Header";
import AIScoreResult from "./components/AIScoreResult";

function App() {
  const [donors, setDonors] = useState([]);

  // Divisions
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

  // Blood groups
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

  // Blood compatibility
  const bloodCompatibility = {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "O-": [
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

  // Blood request state
  const [requestedBloodData, setRequestedBloodData] = useState({
    name: "",
    bloodGroup: "",
    division: "",
  });

  // Generate matched donors with dynamic score
  const matchedDonors = () => {
    // If no blood group is selected,
    // don't show any result
    if (!requestedBloodData.bloodGroup) {
      return [];
    }

    // Get compatible donor blood groups
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

      // Calculate score
      .map((donor) => {
        let score = 50;

        // Same division = +30
        if (
          requestedBloodData.division &&
          donor.division === requestedBloodData.division
        ) {
          score += 30;
        }

        // Available = +20
        if (donor.available === true) {
          score += 20;
        }

        return {
          ...donor,
          score,
        };
      })

      // Highest score first
      .sort((a, b) => b.score - a.score)

      // Show only top 5
      .slice(0, 5);

    return matched;
  };

  // Calculate matched donors once
  const matchedDonorsData = matchedDonors();

  console.log(
    "Requested Blood Data:",
    requestedBloodData
  );

  console.log(
    "Matched Donors:",
    matchedDonorsData
  );

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="container mx-auto py-8">

        {/* Header */}
        <Header />

        {/* Donor Registration */}
        <DonorRegistry
          divisions={divisions}
          bloodGroups={bloodGroups}
          donors={donors}
          setDonors={setDonors}
        />

        {/* Find Donor */}
        <DonorFind
          bloodGroups={bloodGroups}
          divisions={divisions}
          requestedBloodData={requestedBloodData}
          setRequestedBloodData={setRequestedBloodData}
        />

        {/* AI Matching Results */}
        <AIScoreResult
          matchedDonorsData={matchedDonorsData}
        />

        {/* All Donors */}
        <DonorList
          divisions={divisions}
          bloodGroups={bloodGroups}
          donors={donors}
          setDonors={setDonors}
        />

      </div>
    </div>
  );
}

export default App;