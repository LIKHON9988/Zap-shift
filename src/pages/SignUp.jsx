import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router";
import SocialLogIn from "./SocialLogIn";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpUser, updateUserProfile } = UseAuth();

  const handleRegister = (data) => {
    console.log(data.image[0]);
    const profileImage = data.image[0];
    signUpUser(data.email, data.password)
      .then((ressult) => {
        console.log(ressult);
        // get the image url and store
        const formData = new FormData();
        formData.append("image", profileImage);
        const ImageAPIurl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imageHost
        }`;
        axios.post(ImageAPIurl, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          // update process
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          console.log(userProfile);

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-5/5  md:w-3/5 mx-auto border-r-0 md:border-r-2 border-[#CAEB66] py-3 pr-3 rounded-2xl">
      <p className="font-bold text-3xl text-center mb-3">New to ZapShift?</p>
      <p className="text-center mb-6">Sign Up with Zapshift</p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="name"
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="text-red-500">
              Name is required
            </p>
          )}
          {/* photo */}
          <label className="label">Your Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full"
            placeholder="your image"
          />
          {errors.image?.type === "required" && (
            <p role="alert" className="text-red-500">
              Your Image is required
            </p>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email address required
            </p>
          )}
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Please enter a valid email address.
            </p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-500">
              Password required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert" className="text-red-500">
              input must be at least 6 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p role="alert" className="text-red-500">
              Password must be ≥6 characters, include uppercase, lowercase,
              number, and special character.
            </p>
          )}
          <div className="flex justify-between ">
            <a className="link link-hover">Forgot password?</a>
            <p>
              Allready have an account?{" "}
              <Link to={"/logIn"} className="underline text-[#80aa04]">
                Log In
              </Link>
            </p>
          </div>

          <button className="btn bg-[#CAEB66] mt-4 mb-4">Sign UP</button>
        </fieldset>
      </form>
      <SocialLogIn></SocialLogIn>
    </div>
  );
};

export default SignUp;
