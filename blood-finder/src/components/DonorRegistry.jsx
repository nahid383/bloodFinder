import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";

const DonorRegistry = ({
  divisions,
  bloodGroups,
  donors,
  setDonors,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      /*
       * Your Supabase id column is TEXT and NOT NULL.
       * So we must create the ID ourselves.
       *
       * Example:
       * NH-1755089234567
       */
      const donorId = `NH-${Date.now()}`;

      const donorData = {
        id: donorId,
        name: data.name.trim(),
        blood_group: data.bloodGroup,
        division: data.division,
        phone: data.phone.trim(),
        available: true,
      };

      // Insert into Supabase
      const { error } = await supabase
        .from("donors")
        .insert([donorData]);

      if (error) {
        console.error("Supabase registration error:", error);

        setErrorMessage(
          error.message || "Registration failed. Please try again."
        );

        return;
      }

      /*
       * Convert Supabase format to React format
       */
      const formattedDonor = {
        id: donorData.id,
        name: donorData.name,
        bloodGroup: donorData.blood_group,
        division: donorData.division,
        phone: donorData.phone,
        available: donorData.available,
      };

      /*
       * Immediately update donor list
       */
      setDonors((prevDonors) => [
        ...prevDonors,
        formattedDonor,
      ]);

      // Success message
      setSuccessMessage(
        "Registration done successfully! 🎉"
      );

      // Clear form
      reset();

      // Remove success message after 4 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      console.log(
        "New donor registered:",
        formattedDonor
      );
    } catch (error) {
      console.error(
        "Unexpected registration error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-10 md:py-16">

      {/* ================= HEADER ================= */}

      <div className="text-center mb-10">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold mb-5">

          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

          Become a lifesaver

        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-950">
          Become a Blood Donor
        </h1>

        <p className="max-w-2xl mx-auto mt-4 text-slate-500 text-lg leading-relaxed">
          Register yourself as a blood donor and help someone
          find the blood they need when it matters most.
        </p>

      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">

        {/* ================= LEFT INFO ================= */}

        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#605DFF] to-[#4037c9] p-8 md:p-10">

          {/* Decorations */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-white/10" />

          <div className="relative z-10 h-full flex flex-col justify-between">

            <div>

              {/* Blood icon */}

              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-7">

                <span className="text-4xl">
                  🩸
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Your blood can
                <span className="block text-indigo-200">
                  save a life.
                </span>
              </h2>

              <p className="text-indigo-100 mt-5 leading-relaxed">
                Every registered donor brings someone one
                step closer to finding the blood they need.
              </p>

            </div>

            {/* Benefits */}

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-white">
                  Help people in emergencies
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-white">
                  Connect with people nearby
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-white">
                  Make a real difference
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT FORM ================= */}

        <div className="lg:col-span-3 p-8 md:p-10">

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-slate-900">
              Donor Information
            </h2>

            <p className="text-slate-500 mt-1">
              Fill in your details to join our donor network.
            </p>

          </div>

          {/* SUCCESS MESSAGE */}

          {successMessage && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-green-700 flex items-center gap-3">

              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold">
                ✓
              </div>

              <div>
                <p className="font-semibold">
                  Registration Successful
                </p>

                <p className="text-sm">
                  {successMessage}
                </p>
              </div>

            </div>
          )}

          {/* ERROR MESSAGE */}

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-700 flex items-center gap-3">

              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center font-bold">
                ✕
              </div>

              <div>
                <p className="font-semibold">
                  Registration Failed
                </p>

                <p className="text-sm">
                  {errorMessage}
                </p>
              </div>

            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className={`input input-bordered w-full h-12 ${
                  errors.name
                    ? "border-red-400"
                    : ""
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message:
                      "Name must contain at least 2 characters",
                  },
                })}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* BLOOD GROUP + DIVISION */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* BLOOD GROUP */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Blood Group
                </label>

                <select
                  defaultValue=""
                  className={`select select-bordered w-full h-12 ${
                    errors.bloodGroup
                      ? "border-red-400"
                      : ""
                  }`}
                  {...register("bloodGroup", {
                    required:
                      "Blood group is required",
                  })}
                >

                  <option value="" disabled>
                    Select blood group
                  </option>

                  {bloodGroups.map((group) => (
                    <option
                      key={group}
                      value={group}
                    >
                      {group}
                    </option>
                  ))}

                </select>

                {errors.bloodGroup && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bloodGroup.message}
                  </p>
                )}

              </div>

              {/* DIVISION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Division
                </label>

                <select
                  defaultValue=""
                  className={`select select-bordered w-full h-12 ${
                    errors.division
                      ? "border-red-400"
                      : ""
                  }`}
                  {...register("division", {
                    required:
                      "Division is required",
                  })}
                >

                  <option value="" disabled>
                    Select division
                  </option>

                  {divisions.map((division) => (
                    <option
                      key={division}
                      value={division}
                    >
                      {division}
                    </option>
                  ))}

                </select>

                {errors.division && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.division.message}
                  </p>
                )}

              </div>

            </div>

            {/* PHONE */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className={`input input-bordered w-full h-12 ${
                  errors.phone
                    ? "border-red-400"
                    : ""
                }`}
                {...register("phone", {
                  required:
                    "Phone number is required",
                  pattern: {
                    value:
                      /^01[3-9]\d{8}$/,
                    message:
                      "Enter a valid Bangladeshi phone number",
                  },
                })}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}

            </div>

            {/* INFO */}

            <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">

              <p className="text-sm text-slate-500">
                🔒 Your information will be stored securely
                and used only for connecting blood donors
                with people who need them.
              </p>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 rounded-xl text-white font-bold text-base border-0 transition-all duration-200 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, #605DFF, #4037c9)",
              }}
            >

              {loading ? (
                <span className="flex items-center justify-center gap-2">

                  <span className="loading loading-spinner loading-sm" />

                  Registering...

                </span>
              ) : (
                "Register as a Donor →"
              )}

            </button>

          </form>

        </div>

      </div>

      {/* ================= BOTTOM TEXT ================= */}

      <div className="text-center mt-8">

        <p className="text-sm text-slate-400">
          Already registered?
          <span className="text-indigo-600 font-semibold ml-1">
            Thank you for being a lifesaver ❤️
          </span>
        </p>

      </div>

    </section>
  );
};

export default DonorRegistry;