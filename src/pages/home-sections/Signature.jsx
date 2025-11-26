import React from "react";
import { MapPinned, ShieldCheck, Headphones, Truck, Timer } from "lucide-react";

const metrics = [
  { value: "99.9%", label: "On-time" },
  { value: "64", label: "Districts" },
  { value: "1M+", label: "Parcels" },
  { value: "4.8", label: "Rating" },
];

const features = [
  {
    icon: MapPinned,
    title: "Live Tracking",
    desc: "Real-time location visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Handling",
    desc: "Protected chain-of-custody.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Instant customer assistance.",
  },
  {
    icon: Truck,
    title: "Smart Routing",
    desc: "Optimized delivery efficiency.",
  },
];

const steps = [
  { icon: MapPinned, label: "Book" },
  { icon: Timer, label: "Track" },
  { icon: ShieldCheck, label: "Secure" },
  { icon: Truck, label: "Deliver" },
];

const Signature = () => {
  return (
    <section className="mx-2 md:mx-0 my-6 mb-14">
      <div className="  backdrop-blur-sm p-4 md:p-0">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-[#063F30] tracking-tight">
            ZapShift Advantage
          </h2>
          <p className="text-gray-600 text-xs md:text-sm mt-1 ">
            Logistics engineered for precision, trust, and speed.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-5 pt-5">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="text-center py-2 rounded-lg bg-[#f7ffe9] border border-[#d6ef85]/40"
            >
              <div className="text-lg md:text-xl font-bold text-[#063F30]">
                {m.value}
              </div>
              <div className="text-[10px] md:text-xs text-gray-600">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-white border border-gray-100 shadow-sm p-3 hover:shadow-md hover:bg-[#fafff1] transition-all duration-150"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#eaffc2] flex items-center justify-center">
                  <f.icon size={16} className="text-[#5a7f00]" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {f.title}
                </h3>
              </div>
              <p className="text-gray-600 text-xs leading-tight">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Steps (Horizontal Progress Look) */}
        <div className="flex justify-between items-center relative px-1 md:px-6">
          <div className="absolute top-5 left-3 right-3 md:left-10 md:right-10 h-[2px] bg-gradient-to-r from-[#d3f076] via-[#c2e564] to-[#d3f076] opacity-60" />

          {steps.map((s) => (
            <div
              key={s.label}
              className="relative bg-white z-10 flex flex-col items-center"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f1ffd5] border border-[#c9e96d] shadow flex items-center justify-center">
                <s.icon size={16} className="text-[#063F30]" />
              </div>
              <span className="text-[11px] md:text-xs font-medium text-gray-700 mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Signature;
