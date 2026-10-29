import React from "react";
import { assets } from "../assets/assets";

const features = [
  {
    title: "EFFICIENCY",
    description:
      "Streamlined appointment scheduling that fits into your busy lifestyle.",
  },
  {
    title: "CONVENIENCE",
    description:
      "Access to a network of trusted healthcare professionals in your area.",
  },
  {
    title: "PERSONALIZATION",
    description:
      "Tailored recommendations and reminders to help you stay on top of your health.",
  },
];

const About = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16">
      {/* Heading */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <h2>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </h2>
      </div>

      {/* About Content */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-10">
        <img
          className="w-full md:max-w-[380px] rounded-lg"
          src={assets.about_image}
          alt="Healthcare consultation illustration"
          loading="lazy"
        />

        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to <span className="font-semibold">CarePlus</span>, your
            trusted partner in managing healthcare needs conveniently and
            efficiently. At CarePlus, we understand the challenges people face
            when scheduling doctor appointments and managing their health
            records.
          </p>

          <p>
            CarePlus is committed to excellence in healthcare technology. We
            continuously improve our platform by integrating the latest
            advancements to deliver a smooth and reliable experience.
          </p>

          <h3 className="text-gray-800 font-semibold text-base">
            Our Vision
          </h3>

          <p>
            Our vision is to create a seamless healthcare experience for every
            user by bridging the gap between patients and healthcare providers,
            making quality care accessible whenever it is needed.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl my-6">
        <h2>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border px-10 md:px-12 py-10 flex flex-col gap-4 text-[15px] text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            <h4 className="font-semibold">{feature.title}:</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;