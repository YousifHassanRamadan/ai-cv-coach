import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../context/theme-context";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-bg-tertiary hover:bg-bg-headerrr transition cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-text-active" />
      )}
    </button>
  );
};

export default ThemeToggle;
