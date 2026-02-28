import React from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputFieldProps } from "./input.types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  toggle,
  name,
  error,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
        {icon}
      </span>
      <input
        name={name} // important for Formik
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // pass event directly
        className="
          w-full bg-bg-input border border-border rounded-xl
          pl-10 pr-10 py-3 text-sm text-text-primary placeholder-text-muted
          focus:outline-none focus:border-border-active
          transition-all duration-200
        "
      />
      {toggle && (
        <button
          type="button"
          onClick={toggle.onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
        >
          {toggle.visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default InputField;
