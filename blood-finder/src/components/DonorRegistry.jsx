import React from 'react';
import { useForm } from "react-hook-form";

const DonorRegistry = () => {

    const{
        register,
        handleSubmit,
        watch,
        formState: { errors },

    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    console.log(watch("example"));

    return (
        <div className="card bg slate-900 shadow-sm">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input placeholder="Type your Name here"/> */}
                <input type="text" placeholder="Type your Name here" className="input"  {...register("name")}/>
                </form>
            </div>
        </div>
    );
};

export default DonorRegistry;