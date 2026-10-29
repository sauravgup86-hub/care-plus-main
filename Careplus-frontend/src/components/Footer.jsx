import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-40 border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-3 gap-12 text-sm">
        {/* LEFT SECTION */}
        <div>
          <img className="w-36 mb-4" src={assets.logomy} alt="CarePlus" />

          <p className="text-gray-600 leading-6">
            CarePlus is a modern healthcare platform that helps patients easily
            find trusted doctors, view availability, and book appointments
            online. Our mission is to make healthcare accessible, simple, and
            convenient for everyone.
          </p>

          <div className="flex gap-4 mt-6 text-gray-500">
            <span className="cursor-pointer hover:text-primary">Facebook</span>
            <span className="cursor-pointer hover:text-primary">Twitter</span>
            <span className="cursor-pointer hover:text-primary">LinkedIn</span>
          </div>
        </div>
        {/* COMPANY */}
        <div>
          <p className="text-lg font-semibold mb-5">Company</p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li>
              <Link to="/" className="cursor-pointer hover:text-primary">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="cursor-pointer hover:text-primary">
                About CarePlus
              </Link>
            </li>

            <li>
              <Link to="/doctors" className="cursor-pointer hover:text-primary">
                Find Doctors
              </Link>
            </li>

            <li>
              <Link
                to="/#speciality"
                className="cursor-pointer hover:text-primary"
              >
                Book Appointment
              </Link>
            </li>

            <li>
              <Link to="/contact" className="cursor-pointer hover:text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* CONTACT */}
        <div>
          <p className="text-lg font-semibold mb-5">Contact</p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li> +91 9736900011</li>
            <li> riteshsharma140803@gmail.com</li>
            <li> Gurugram, Haryana, India</li>
          </ul>

          <p className="text-gray-500 mt-4 text-xs">
            Available Monday – Saturday | 9:00 AM – 7:00 PM
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t text-center text-gray-500 text-sm py-5">
        © {new Date().getFullYear()} CarePlus Healthcare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
