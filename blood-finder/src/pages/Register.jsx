import { useState } from "react";
import DonorRegistry from "../components/DonorRegistry";

const Register = () => {
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
    <DonorRegistry
      divisions={divisions}
      bloodGroups={bloodGroups}
      donors={donors}
      setDonors={setDonors}
    />
  );
};

export default Register;