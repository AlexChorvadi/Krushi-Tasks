import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const token = location.state?.token;

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/reset-password`,
                {
                    email: email,
                    resetToken: token,
                    password: password
                }
            );

            console.log(response.data);

            setMessage(
                `Password reset successfully ${email}`
            );

            setPassword("");

            navigate("/login");

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
                    Reset Password
                </h1>

                <p className="text-gray-400 text-center mb-8">

                    {email && `User: ${email}`}

                    {message && (
                        <span className="text-cyan-400 block mt-2">
                            {message}
                        </span>
                    )}

                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
                    >

                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                Resetting...
                            </>
                        ) : (
                            "Reset Password"
                        )}

                    </button>

                </form>

                <p className="text-center mt-6">

                    <Link
                        to="/login"
                        className="text-cyan-400 hover:underline"
                    >
                        Back to Login
                    </Link>

                </p>

            </div>

        </div>
    );
}