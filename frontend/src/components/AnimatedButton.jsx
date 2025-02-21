import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { clsx } from "clsx";

export default function AnimatedButton({ onClick, isLoading, label }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!isLoading) {
      setClicked(true);
      onClick();
      setTimeout(() => setClicked(false), 600); // Reset animation
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={clsx(
        "flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out",
        "relative overflow-hidden shadow-lg group",
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
      )}
    >
      {/* Ripple effect */}
      <span
        className={clsx(
          "absolute inset-0 bg-green-500 transition-all duration-500 ease-out scale-0 group-hover:scale-100 opacity-20",
          clicked && "scale-100"
        )}
      />

      {/* Loading or icon */}
      {isLoading ? (
        <Loader2 className="animate-spin w-5 h-5 text-white" />
      ) : (
        <CheckCircle size={18} className="text-white" />
      )}
      {label}
    </button>
  );
}
