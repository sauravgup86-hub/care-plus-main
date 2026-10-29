import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const res = await axios.post(backendUrl + "/api/user/contact", {
        name,
        email,
        message,
      });

      setStatus(res.data.message || "Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-6 md:px-20 py-16">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-500 mt-3">
          We'd love to hear from you. Reach out to us anytime.
        </p>
      </div>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* Image */}
        <img
          src={assets.contact_image}
          alt="contact"
          className="rounded-xl shadow-lg w-full object-cover"
        />

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Office
            </h3>
            <p className="text-gray-600">
              Gurugram <br />
              Haryana, India
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Contact Info
            </h3>
            <p className="text-gray-600">
              Tel: 9736900011 <br />
              Email: ritehsharma140803@gmail.com
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Working Hours
            </h3>

            <div className="text-gray-600 space-y-1">
              <p>Monday - Friday : 9:00 AM - 8:00 PM</p>
              <p>Saturday : 10:00 AM - 6:00 PM</p>
              <p>Sunday : Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send us a Message
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            ></textarea>

            {status && <p className="text-sm text-gray-600">{status}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-md">
          <iframe
            title="location"
            src="https://www.google.com/maps?q=Gurugram,Haryana,India&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
