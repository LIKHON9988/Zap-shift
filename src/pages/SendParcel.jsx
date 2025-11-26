import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseAxios from "../hooks/UseAxios";
import UseAuth from "../hooks/UseAuth";

const SendParcel = () => {
  const [type, setType] = useState("document");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = UseAuth();
  const axiosSequre = UseAxios();
  const serviceCenters = useLoaderData();

  // Unique Regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Get districts
  const districtByRegion = (region) => {
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const onSubmit = (data) => {
    // Calculate cost
    const isDocument = type === "document";
    const parcelWeight = parseFloat(data.parcelWeight);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    // Final data to send
    const finalData = {
      ...data,
      parcelType: type,
      cost,
    };

    console.log("Submitting parcel:", finalData);

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} Tk!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequre
          .post("/parcels", finalData)
          .then((res) => {
            console.log("Parcel saved:", res.data);
            Swal.fire({
              title: "Success!",
              text: "Your parcel has been booked successfully.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error("Error posting parcel:", err);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while booking your parcel.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="space-y-6 mb-14 mt-10 shadow-lg rounded-2xl md:rounded-3xl p-2 md:p-7 bg-[#f8faf2]">
      <h1 className="font-bold text-3xl text-[#063F30]">Send A Parcel</h1>
      <p className="text-gray-600">Enter your parcel details</p>
      <hr className="border-gray-300" />

      {/* Parcel Type */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="parcelType"
            className="radio radio-success"
            checked={type === "document"}
            onChange={() => setType("document")}
          />
          <span>Document</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="parcelType"
            className="radio radio-success"
            checked={type === "nonDocument"}
            onChange={() => setType("nonDocument")}
          />
          <span>Not-Document</span>
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Parcel Name</label>
            <input
              className="input w-full"
              placeholder="Parcel Name"
              {...register("parcelName", {
                required: "Parcel name is required",
              })}
            />
            {errors.parcelName && (
              <p className="text-red-500 text-sm">
                {errors.parcelName.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Parcel Weight (KG)</label>
            <input
              className="input w-full"
              type="number"
              placeholder="Parcel Weight (KG)"
              {...register("parcelWeight", {
                required: "Weight is required",
              })}
            />
            {errors.parcelWeight && (
              <p className="text-red-500 text-sm">
                {errors.parcelWeight.message}
              </p>
            )}
          </div>
        </div>

        {/* Sender + Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {/* Sender */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Sender Details</h2>

            <div>
              <label className="label">Sender Name</label>
              <input
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
                {...register("senderName", {
                  required: "Sender name is required",
                })}
              />
              {errors.senderName && (
                <p className="text-red-500 text-sm">
                  {errors.senderName.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Sender Email</label>
              <input
                type="email"
                className="input w-full"
                defaultValue={user?.email}
                placeholder="Sender Email"
                {...register("senderEmail", {
                  required: "Sender email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.senderEmail && (
                <p className="text-red-500 text-sm">
                  {errors.senderEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Sender Phone No</label>
              <input
                className="input w-full"
                placeholder="Sender Phone No"
                {...register("senderPhone", {
                  required: "Phone number is required",
                })}
              />
              {errors.senderPhone && (
                <p className="text-red-500 text-sm">
                  {errors.senderPhone.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Your Region</label>
              <select
                className="select w-full"
                defaultValue=""
                {...register("senderRegion", {
                  required: "Region is required",
                })}
              >
                <option value="" disabled>
                  Select your region
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <p className="text-red-500 text-sm">
                  {errors.senderRegion.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Your District</label>
              <select
                className="select w-full"
                defaultValue=""
                {...register("senderDistrict", {
                  required: "District is required",
                })}
              >
                <option value="" disabled>
                  Select your District
                </option>

                {senderRegion &&
                  districtByRegion(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
              {errors.senderDistrict && (
                <p className="text-red-500 text-sm">
                  {errors.senderDistrict.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Pickup Instruction</label>
              <textarea
                className="textarea w-full"
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
              />
            </div>
          </div>

          {/* Receiver */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Receiver Details</h2>

            <div>
              <label className="label">Receiver Name</label>
              <input
                className="input w-full"
                placeholder="Receiver Name"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm">
                  {errors.receiverName.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Receiver Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Receiver Email"
                {...register("receiverEmail", {
                  required: "Receiver email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.receiverEmail && (
                <p className="text-red-500 text-sm">
                  {errors.receiverEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Receiver Contact No</label>
              <input
                className="input w-full"
                placeholder="Receiver Contact No"
                {...register("receiverPhone", {
                  required: "Receiver phone number required",
                })}
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-sm">
                  {errors.receiverPhone.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Receiver Region</label>
              <select
                className="select w-full"
                defaultValue=""
                {...register("receiverRegion", {
                  required: "Region is required",
                })}
              >
                <option value="" disabled>
                  Select receiver's region
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <p className="text-red-500 text-sm">
                  {errors.receiverRegion.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Receiver District</label>
              <select
                className="select w-full"
                defaultValue=""
                {...register("receiverDistrict", {
                  required: "District is required",
                })}
              >
                <option value="" disabled>
                  Select receiver District
                </option>

                {receiverRegion &&
                  districtByRegion(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
              {errors.receiverDistrict && (
                <p className="text-red-500 text-sm">
                  {errors.receiverDistrict.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Delivery Instruction</label>
              <textarea
                className="textarea w-full"
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          * PickUp Time 4pm-7pm Approx.
        </p>

        <button type="submit" className="btn bg-[#CAEB66] mt-6">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
