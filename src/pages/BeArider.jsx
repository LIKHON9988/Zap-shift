import React, { useEffect, useMemo, useState } from "react";
import riderImg from "../assets/big-deliveryman.png";

const BeArider = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const d = Array.from(new Set(data.map((c) => c.district))).sort();
        setDistricts(d);
      })
      .catch(() => setDistricts([]));
  }, []);

  const districtOptions = useMemo(() => districts, [districts]);

  return (
    <div className="space-y-6 shadow-lg rounded-2xl md:rounded-3xl p-2 md:p-7 bg-[#f8faf2]">
      <h1 className="font-bold text-3xl text-[#063F30]">Be a Rider</h1>
      <p className="text-gray-600 max-w-3xl">
        Enjoy fast, reliable parcel delivery with real‑time tracking and zero hassle. From personal
        packages to business shipments — we deliver on time, every time.
      </p>
      <hr className="border-gray-300" />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <form className="flex-1 space-y-6">
          <h2 className="font-semibold text-xl text-[#063F30]">Tell us about yourself</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Your Name</label>
              <input className="input w-full" placeholder="Your Name" />
            </div>
            <div>
              <label className="label">Your age</label>
              <input className="input w-full" placeholder="Your age" />
            </div>
            <div>
              <label className="label">Your Email</label>
              <input className="input w-full" placeholder="Your Email" />
            </div>
            <div>
              <label className="label">Your District</label>
              <select className="select w-full">
                <option disabled selected>Select your District</option>
                {districtOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">NID No</label>
              <input className="input w-full" placeholder="NID" />
            </div>
            <div>
              <label className="label">Contact</label>
              <input className="input w-full" placeholder="Contact" />
            </div>
            <div className="md:col-span-2">
              <label className="label">Which warehouse you want to work?</label>
              <select className="select w-full">
                <option disabled selected>Select wire‑house</option>
                {districtOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="button" className="btn bg-[#CAEB66]">Submit</button>
        </form>

        <div className="flex-1 flex justify-center">
          <img src={riderImg} alt="Rider" className="max-w-md w-full" />
        </div>
      </div>
    </div>
  );
};

export default BeArider;
