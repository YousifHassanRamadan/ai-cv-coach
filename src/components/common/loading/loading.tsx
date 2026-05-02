import { useEffect, useState } from "react";
import type { LoadingTextProps } from "./loading.types";

const LoadingText: React.FC<LoadingTextProps> = ({ text = "Loading" }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center text-lg font-medium">
      <span>
        {text}
        {dots}
      </span>
    </div>
  );
};

export default LoadingText;
