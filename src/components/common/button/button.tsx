import type { TButtonProps } from "./button.types";

const Button: React.FC<TButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 bg-gradient-to-r from-text-active to-text-gray2 hover:from-text-active hover:to-text-gray2 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-900/30 hover:bg-bg-active/10 cursor-pointer"
      onClick={onClick}
    >
      {icon && <>{icon}</>}
      {text}
    </button>
  );
};

export default Button;
