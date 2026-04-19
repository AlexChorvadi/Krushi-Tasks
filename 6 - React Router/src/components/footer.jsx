export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 py-6 text-center bg-[#020617]">

            <p className="text-gray-400 text-sm flex items-center justify-center gap-2 group">
                Built with

                <span className="text-pink-500 animate-pulse group-hover:scale-110 transition">
                    ❤️
                </span>

                by{" "}
                <span className="font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent group-hover:opacity-80 transition">
                    <a
                        href="https://github.com/AlexChorvadi/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent hover:opacity-80"
                    >
                        Krushi
                    </a>

                </span>
            </p>

        </footer>
    );
}
