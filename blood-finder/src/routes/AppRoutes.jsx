import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import DonorList from "../components/DonorList";
import DonorRegistry from "../components/DonorRegistry";
import DonorFind from "../components/DonorFind";
import AIScoreResult from "../components/AIScoreResult";

const AppRoutes = ({
  donors,
  setDonors,
  divisions,
  bloodGroups,
  requestedBloodData,
  setRequestedBloodData,
  matchedDonorsData,
}) => {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={
          <Home donorCount={donors.length} />
        }
      />

      {/* Donor Registration */}
      <Route
        path="/register"
        element={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <DonorRegistry
              divisions={divisions}
              bloodGroups={bloodGroups}
              donors={donors}
              setDonors={setDonors}
            />
          </div>
        }
      />

      {/* Donor List */}
      <Route
        path="/donors"
        element={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <DonorList
              divisions={divisions}
              bloodGroups={bloodGroups}
              donors={donors}
              setDonors={setDonors}
            />
          </div>
        }
      />

      {/* Find Donor */}
      <Route
        path="/find"
        element={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

            <div className="space-y-6 sm:space-y-8">

              <DonorFind
                bloodGroups={bloodGroups}
                divisions={divisions}
                requestedBloodData={requestedBloodData}
                setRequestedBloodData={setRequestedBloodData}
              />

              <AIScoreResult
                matchedDonorsData={matchedDonorsData}
              />

            </div>

          </div>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">

              <h1 className="text-6xl font-black text-slate-900">
                404
              </h1>

              <p className="text-slate-500 mt-3">
                Page not found
              </p>

              <a
                href="/"
                className="inline-block mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Go Home
              </a>

            </div>
          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;