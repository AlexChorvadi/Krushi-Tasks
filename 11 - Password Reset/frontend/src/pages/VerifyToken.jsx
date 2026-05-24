import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function VerifyToken() {
  const [Token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/verify-token`,
        { resetToken: Token }
      );

      navigate("/reset-password", {
        state: {
          email: response.data.email,
          token: Token
        }
      });

      setMessage(
        `Token verified successfully for ${response.data.email}`
      );

      setToken("");

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
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Verify Token
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Please Verify your reset token

          {message && (
            <span className="text-cyan-400 block mt-2">
              {message}
            </span>
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Enter your reset token"
            value={Token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
          />

          <button
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              "Verify Token"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}