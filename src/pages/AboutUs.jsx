import React, { useState } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabContent = {
    Story: `
      We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. 
      Over the years, our commitment to real-time tracking, efficient logistics, and customer-first 
      service has made us a trusted partner for thousands. Whether it's a personal gift or a 
      time-sensitive business delivery, we ensure it reaches its destination — on time, every time.

      We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. 
      Over the years, our commitment to real-time tracking, efficient logistics, and customer-first 
      service has made us a trusted partner for thousands.
      
      We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. 
      Over the years, our commitment to real-time tracking, efficient logistics, and customer-first 
      service has made us a trusted partner for thousands.
    `,
    Mission: `
      Our mission is to redefine parcel delivery through reliability, innovation, and world-class service.
      We work tirelessly to ensure fast delivery, transparent tracking, and seamless customer support across all regions.
    `,
    Success: `
      Over the past decade, we have completed millions of successful deliveries with industry-leading 
      satisfaction ratings. Our growth continues as we expand our network and delivery performance.
    `,
    "Team & Others": `
      Our team is made up of experienced logistics professionals, innovative thinkers, and dedicated 
      customer service specialists. Together, we ensure every package is handled with care and delivered on time.
    `,
  };

  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  return (
    <div className="h-full md:h-[70vh] py-16 space-y-10 shadow-lg rounded-3xl p-5 mx-2 md:mx-0 mb-14">
      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-[#063F30]">About Us</h1>
        <p className="text-gray-600 max-w-3xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <hr className="border-gray-300" />

      {/* Tabs */}
      <div className="flex gap-8 text-lg font-medium text-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab
                ? "text-green-700 font-semibold"
                : "hover:text-black"
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default AboutSection;
