import { useEffect } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ open, close, children, Header }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={close}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-lg rounded-2xl bg-[#0f172a]/90 border border-white/10 backdrop-blur-xl shadow-2xl animate-[fadeIn_0.25s_ease]">

        {/* Glow layer */}
        <div className="absolute inset-0 rounded-2xl opacity-30 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-xl"></div>

        <div className="relative z-10 p-5">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-100">
              {Header}
            </h2>

            <button
              onClick={close}
              className="text-gray-400 hover:text-white text-xl transition"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-end gap-3">

            <button
              onClick={close}
              className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition"
            >
              Close
            </button>

            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white hover:scale-105 transition transform shadow-lg shadow-indigo-500/30">
              Checkout
            </button>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalPortal;
