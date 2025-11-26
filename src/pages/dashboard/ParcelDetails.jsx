import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import UseAxios from "../../hooks/UseAxios";

const ParcelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxios();

  const [parcel, setParcel] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const res = await axiosSecure.get(`/parcels/${id}`);
        setParcel(res.data);
      } catch (err) {
        setStatus("Failed to load parcel details");
      }
    };
    fetchParcel();
  }, [id, axiosSecure]);

  if (!parcel) {
    return (
      <p className="text-center py-10 text-gray-500">
        {status || "Loading parcel details..."}
      </p>
    );
  }

  return (
    <div className="p-8">
      {/* --- Back Button --- */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#CAEB66] hover:bg-[#b0d65b] rounded-xl transition-all duration-200"
      >
        ← Back
      </button>

      {/* --- Main Card --- */}
      <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#063F30] tracking-tight">
            Parcel Overview
          </h2>
          <span className="text-xs px-4 py-1 bg-gray-100 border rounded-full text-gray-600">
            PARCEL ID: {id}
          </span>
        </div>

        {/* Parcel Type Tag */}
        <div className="mb-8">
          <span className="px-5 py-1.5 text-sm bg-[#063F30]/10 text-[#063F30] border border-[#063F30]/20 rounded-full font-semibold tracking-wide">
            {parcel.parcelType || "Unknown Type"}
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* PARCEL INFO */}
          <div className="p-6 bg-white rounded-2xl border shadow-sm">
            <h3 className="text-lg font-semibold text-[#063F30] mb-4">
              📦 Parcel Information
            </h3>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Name:</span> {parcel.parcelName}
              </p>
              <p>
                <span className="font-medium">Weight:</span>{" "}
                {parcel.parcelWeight || parcel.weightKg || "N/A"} kg
              </p>
              <p>
                <span className="font-medium">Type:</span> {parcel.parcelType}
              </p>
              <p>
                <span className="font-medium">Cost:</span> {parcel.cost} TK
              </p>
            </div>
          </div>

          {/* SENDER INFO */}
          <div className="p-6 bg-white rounded-2xl border shadow-sm">
            <h3 className="text-lg font-semibold text-[#063F30] mb-4">
              👤 Sender Details
            </h3>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Name:</span> {parcel.senderName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {parcel.senderEmail}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {parcel.senderPhone}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {parcel.senderRegion}, {parcel.senderDistrict}
              </p>
            </div>
          </div>

          {/* RECEIVER INFO */}
          <div className="p-6 bg-white rounded-2xl border shadow-sm">
            <h3 className="text-lg font-semibold text-[#063F30] mb-4">
              🎯 Receiver Details
            </h3>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Name:</span> {parcel.receiverName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {parcel.receiverEmail}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {parcel.receiverPhone}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {parcel.receiverRegion}, {parcel.receiverDistrict}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-10 p-7 bg-white rounded-2xl border shadow-sm">
          <h3 className="text-xl font-semibold text-[#063F30] mb-4">
            📝 Delivery Instructions
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-medium text-gray-800 mb-1">
                Pickup Instruction
              </p>
              <p className="text-gray-600">
                {parcel.pickupInstruction || "No pickup instructions provided."}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-800 mb-1">
                Delivery Instruction
              </p>
              <p className="text-gray-600">
                {parcel.deliveryInstruction ||
                  "No delivery instructions provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
