import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        formData
      );

      // console.log(response.data);
      const jsonStr = JSON.stringify(response.data);
      localStorage.setItem("data", jsonStr);
      
      navigate("/home")

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Login
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Welcome back

          {message && (
            <span className="text-cyan-400 block mt-2">
              {message}
            </span>
          )}
        </p>


        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
          />

          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl">
            Login
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm">
          <Link
            to="/forgot-password"
            className="text-cyan-400 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}