import { useState } from "react";
import DonorList from "./components/Donorlist";
import DonorRegistry from "./components/DonorRegistry";
import Header from "./components/Header";

function App() {

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

  const bloodCompatibility = {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="container mx-auto py-8">

        <Header />

        <DonorRegistry
          divisions={divisions}
          bloodGroups={bloodGroups}
          donors={donors}
          setDonors={setDonors}
        />

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