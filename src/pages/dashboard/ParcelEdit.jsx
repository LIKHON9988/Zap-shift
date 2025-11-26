import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxios from "../../hooks/UseAxios";

const ParcelEdit = () => {
  const axiosSecure = UseAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);

  const [form, setForm] = useState({
    parcelName: "",
    parcelType: "",
    senderName: "",
    senderPhone: "",
    senderDistrict: "",
    receiverName: "",
    receiverPhone: "",
    receiverDistrict: "",
    expectedDelivery: "",
  });

  const [status, setStatus] = useState("");

  // Load districts
  useEffect(() => {
    fetch("/warehouses.json")
      .then((r) => r.json())
      .then((data) => {
        const unique = Array.from(new Set(data.map((c) => c.district))).sort();
        setDistricts(unique);
      });
  }, []);

  // Load parcel data
  useEffect(() => {
    const loadParcel = async () => {
      try {
        const res = await axiosSecure.get(`/parcels/${id}`);
        setForm({
          parcelName: res.data.parcelName || "",
          parcelType: res.data.parcelType || "",
          senderName: res.data.senderName || "",
          senderPhone: res.data.senderPhone || "",
          senderDistrict: res.data.senderDistrict || "",
          receiverName: res.data.receiverName || "",
          receiverPhone: res.data.receiverPhone || "",
          receiverDistrict: res.data.receiverDistrict || "",
          expectedDelivery: res.data.expectedDelivery?.slice(0, 10) || "",
        });
      } catch (err) {
        setStatus("❌ Failed to load parcel data");
      }
    };

    loadParcel();
  }, [id, axiosSecure]);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const districtOptions = useMemo(() => districts, [districts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await axiosSecure.patch(`/parcels/${id}`, form);
      setStatus("✔ Parcel updated successfully!");
      setTimeout(() => navigate("/dashBoard/myParcels"), 800);
    } catch (err) {
      setStatus(" Update failed!");
    }
  };

  return (
    <div className="rounded-2xl border border-[#d9ef90] bg-white p-6 shadow-sm mt-7 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-lg bg-[#CAEB66] hover:bg-[#b0d65b] transition w-full md:w-auto"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
        <h2 className="text-3xl font-semibold text-[#063F30]">Edit Parcel</h2>
        <span className="text-sm text-gray-500">Parcel ID: {id}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Parcel Name</label>
            <input
              className="input w-full"
              value={form.parcelName}
              onChange={(e) => updateField("parcelName", e.target.value)}
              placeholder="Enter parcel name"
            />
          </div>

          <div>
            <label className="label">Parcel Type</label>
            <select
              className="select w-full"
              value={form.parcelType}
              onChange={(e) => updateField("parcelType", e.target.value)}
            >
              <option value="">Select parcel type</option>
              <option value="Document">Document</option>
              <option value="Not-Document">Not-Document</option>
            </select>
          </div>
        </div>

        {/* Sender  */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="label">Sender Name</label>
            <input
              className="input w-full"
              value={form.senderName}
              onChange={(e) => updateField("senderName", e.target.value)}
              placeholder="Enter sender name"
            />
          </div>

          <div>
            <label className="label">Sender Phone</label>
            <input
              className="input w-full"
              value={form.senderPhone}
              onChange={(e) => updateField("senderPhone", e.target.value)}
              placeholder="Enter sender phone"
            />
          </div>

          <div>
            <label className="label">Sender District</label>
            <select
              className="select w-full"
              value={form.senderDistrict}
              onChange={(e) => updateField("senderDistrict", e.target.value)}
            >
              <option value="">Select District</option>
              {districtOptions.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Receiver  */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="label">Receiver Name</label>
            <input
              className="input w-full"
              value={form.receiverName}
              onChange={(e) => updateField("receiverName", e.target.value)}
              placeholder="Enter receiver name"
            />
          </div>

          <div>
            <label className="label">Receiver Phone</label>
            <input
              className="input w-full"
              value={form.receiverPhone}
              onChange={(e) => updateField("receiverPhone", e.target.value)}
              placeholder="Enter receiver phone"
            />
          </div>

          <div>
            <label className="label">Receiver District</label>
            <select
              className="select w-full"
              value={form.receiverDistrict}
              onChange={(e) => updateField("receiverDistrict", e.target.value)}
            >
              <option value="">Select District</option>
              {districtOptions.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Expected Delivery Date</label>
          <input
            type="date"
            className="input w-full"
            value={form.expectedDelivery}
            onChange={(e) => updateField("expectedDelivery", e.target.value)}
          />
        </div>

        {status && (
          <p className="text-sm font-medium text-green-700">{status}</p>
        )}

        <button className="btn bg-[#CAEB66] hover:bg-[#b0d65b] text-black px-6 py-3 rounded-lg w-full md:w-auto transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ParcelEdit;
