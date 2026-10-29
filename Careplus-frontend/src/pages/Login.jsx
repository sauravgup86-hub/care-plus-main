import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [state, setState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(AppContext);

  // SEND OTP
  const sendOtpHandler = async () => {
    try {

      if (!email) {
        return toast.error("Enter email first");
      }

      if (!backendUrl) {
        return toast.error("Backend URL is not configured");
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/send-otp",
        { email: email.trim() }
      );

      if (data.success) {
        toast.success("OTP sent to email");
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // VERIFY OTP
  const verifyOtpHandler = async () => {

    try {

      if (!backendUrl) {
        return toast.error("Backend URL is not configured");
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/verify-otp",
        { email: email.trim(), otp }
      );

      if (data.success) {
        toast.success("Email verified");
        setOtpVerified(true);
      } else {
        toast.error(data.message || "Invalid OTP");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try {

      if (state === "Sign Up" && !otpVerified) {
        return toast.error("Please verify OTP first");
      }

      setLoading(true);

      if (state === "Sign Up") {

        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          { name, email, password }
        );

        if (data.success) {
          toast.success("Account created successfully");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }

      } else {

        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          { email, password }
        );

        if (data.success) {
          toast.success("Login successful");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }

      }

    } catch (error) {

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error");
      }

    } finally {
      setLoading(false);
    }

  };

  return (

    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">

      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">

        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setOtp("");
              setOtpSent(false);
              setOtpVerified(false);
            }}
            value={email}
            className="border rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        {state === "Sign Up" && !otpSent && (
          <button
            type="button"
            onClick={sendOtpHandler}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Send OTP
          </button>
        )}

        {otpSent && !otpVerified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border rounded w-full p-2"
            />

            <button
              type="button"
              onClick={verifyOtpHandler}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded-md"
        >
          {loading
            ? "Processing..."
            : state === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

      </div>

    </form>
  );
};

export default Login;