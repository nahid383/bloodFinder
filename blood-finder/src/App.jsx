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

  // Blood Groups
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

  // Recipient Blood Group -> Compatible Donor Blood Groups
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

  // Blood request state
  const [requestedBloodData, setRequestedBloodData] = useState({
    name: "",
    bloodGroup: "",
    division: "",
  });

  // Generate matched donors
  const matchedDonors = () => {
    // If no blood group is selected
    if (!requestedBloodData.bloodGroup) {
      return [];
    }

    // Get compatible donor groups
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

        // --------------------------------
        // 1. Blood Group Match
        // --------------------------------

        // Exact blood group match
        if (
          donor.bloodGroup === requestedBloodData.bloodGroup
        ) {
          score += 60;
        } else {
          // Compatible but different blood group
          score += 40;
        }

        // --------------------------------
        // 2. Same Division
        // --------------------------------

        if (
          requestedBloodData.division &&
          donor.division === requestedBloodData.division
        ) {
          score += 25;
        }

        // --------------------------------
        // 3. Availability
        // --------------------------------

        if (donor.available === true) {
          score += 15;
        }

        return {
          ...donor,
          score,
        };
      })

      // Sort from best to worst
      .sort((a, b) => {
        // Higher score first
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

      // Show best 10
      .slice(0, 10);

    return matched;
  };

  // Calculate matching results
  const matchedDonorsData = matchedDonors();

  console.log("Requested Blood Data:", requestedBloodData);
  console.log("Matched Donors:", matchedDonorsData);

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