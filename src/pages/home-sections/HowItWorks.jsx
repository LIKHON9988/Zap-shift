import React from "react";
import { CalendarDays, PackageCheck, Route } from "lucide-react";

const steps = [
  {
    icon: <CalendarDays size={18} />,
    title: "Schedule & Pickup",
    desc: "Choose a slot and we collect from your door.",
    color: "from-purple-400 to-purple-500",
  },
  {
    icon: <Route size={18} />,
    title: "Track in Real-Time",
    desc: "Transparent handoffs and live route visibility.",
    color: "from-cyan-400 to-cyan-500",
  },
  {
    icon: <PackageCheck size={18} />,
    title: "Delivered on Time",
    desc: "Proof of delivery with signature.",
    color: "from-pink-400 to-pink-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-10 mb-10">
      {/* Title */}
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-8">
        How it works?
      </h2>

      {/* Steps */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 ">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center flex-1 relative"
          >
            {/* Icon Box */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white
                           bg-gradient-to-br ${step.color} shadow-sm mb-3`}
            >
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base mb-1">{step.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-xs max-w-[240px] leading-relaxed">
              {step.desc}
            </p>

            {/* Connector Line */}
            {i !== steps.length - 1 && (
              <div className="hidden md:block absolute top-6 right-[-50%] w-[100%]">
                <div className="border-t border-dotted border-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
