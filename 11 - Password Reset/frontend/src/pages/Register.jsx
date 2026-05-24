import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        formData
      );

      console.log(response.data);

      setMessage("Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Register
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Create your account
        </p>

        {message && (
          <div className="mb-4 text-center text-sm text-cyan-400">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
            required
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-cyan-400 ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}