import React from "react";
import { useForm } from "react-hook-form";

const DonorRegistry = ({ divisions, bloodGroups, donors, setDonors}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const donor = {
      ...data,
      id: `NH-${donors.length+1+1000}`, 
      available: true,
    }

    console.log(donor);

    setDonors([...donors, donor]);
  };

  console.log(watch("name"));

  return (
    <div className="card bg-slate-900 shadow-sm mb-6">
      <div className="card-body">
        <h2 className="card-title font-bold text-white mb-4 text 3xl">
          Donor Registration
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Type your Name here"
            className="input w-full"
            {...register("name")}
          />

          {/* Blood Group */}
          <select
            defaultValue=""
            className="select select-bordered w-full"
            {...register("bloodGroup")}
          >
            <option value="" disabled>
              Your Blood Group
            </option>

            {bloodGroups.map((bloodGroup) => (
              <option key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </option>
            ))}
          </select>

          {/* Division */}
          <select
            defaultValue=""
            className="select select-bordered w-full"
            {...register("division")}
          >
            <option value="" disabled>
              Your Division
            </option>

            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            className="input w-full"
            {...register("phone")}
          />

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full text-white border-0"
            style={{ backgroundColor: "#605DFF" }}
          >
            Add Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistry;