import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

        const getProfile = async () => {
            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(response.data.user);

            } catch (error) {
                console.log(error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
            }
        };

        getProfile();


    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">

            {/* Navbar */}
            <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-cyan-400">
                        AuthFlow
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-xl transition"
                    >
                        Logout
                    </button>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left Content */}
                    <div>

                        <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm border border-cyan-500/20">
                            Authentication System
                        </span>

                        <h1 className="text-5xl font-bold leading-tight mt-6">
                            Welcome back,
                            <span className="text-cyan-400 block mt-2">
                                {user?.name}
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg mt-6 leading-relaxed">
                            modern MERN authentication system is fully working with
                            JWT authentication, protected routes, and
                            secure login functionality.
                        </p>

                        <div className="flex gap-4 mt-8">

                            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-2xl transition">
                                Dashboard
                            </button>

                            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-2xl transition">
                                Explore
                            </button>

                        </div>

                    </div>

                    {/* Right Card */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            User Information
                        </h2>

                        <div className="space-y-5">

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm">
                                    Full Name
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {user?.name}
                                </h3>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm">
                                    Email Address
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {user?.email}
                                </h3>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm">
                                    Gender
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {user?.gender || "Not Added"}
                                </h3>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm">
                                    Hobby
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {user?.hobby || "Not Added"}
                                </h3>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Bottom Stats */}
            <section className="max-w-7xl mx-auto px-6 pb-16">

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
                        <h2 className="text-4xl font-bold text-cyan-400">
                            JWT
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Secure authentication using JSON Web Tokens.
                        </p>
                    </div>

                    <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
                        <h2 className="text-4xl font-bold text-cyan-400">
                            MERN
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Full stack architecture with MongoDB, Express, React and Node.
                        </p>
                    </div>

                    <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
                        <h2 className="text-4xl font-bold text-cyan-400">
                            Secure
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Password hashing flow implemented.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}