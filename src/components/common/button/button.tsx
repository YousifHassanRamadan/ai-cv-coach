import type { TButtonProps } from "./button.types";

const Button: React.FC<TButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-900/30"
      onClick={onClick}
    >
      {icon && <>{icon}</>}
      {text}
    </button>
  );
};

export default Button;
