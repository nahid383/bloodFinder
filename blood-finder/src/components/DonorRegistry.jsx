import React from "react";
import { useForm } from "react-hook-form";

const DonorRegistry = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(watch("name"));

  return (
    <div className="card bg-slate-900 shadow-sm">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Type your Name here"
            className="input w-full"
            {...register("name")}
          />

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistry;