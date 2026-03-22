import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ dispatch, state, open, close, children, Header }) => {
    useEffect(() => {
        const rootElement = document.body;
        if (open) {
            rootElement.classList.add('overlay');
        } else {
            rootElement.classList.remove('overlay');
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={close}
            ></div>

            <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scaleIn">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{Header}</h2>
                    <button
                        onClick={close}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {children}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={close}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
                        Checkout
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ModalPortal;
