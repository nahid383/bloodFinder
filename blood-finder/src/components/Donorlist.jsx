import React, { useEffect, useState } from "react";

const DonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    async function loadDonors() {
      const res = await fetch("/data.json");
      const data = await res.json();

      setDonors(data);
    }

    loadDonors();
  }, []);

  console.log("All Donors:", donors);

  return (
    <div className="card bg-slate-900 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-white mb-4">
          Donor List
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Division</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor.id}>
                  <th>{index + 1}</th>
                  <td>{donor.name}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.division}</td>
                  <td>{donor.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-slate-300 mt-4">
          Total Donors: {donors.length}
        </p>
      </div>
    </div>
  );
};

export default DonorList;