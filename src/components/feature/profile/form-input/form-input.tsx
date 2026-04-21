import type { FormInputProps } from "./form-input.types";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  fullWidth = false,
  error,
}: FormInputProps) => {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="block text-sm font-medium text-text-muted mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-bg-primary border border-border-light rounded-lg px-4 py-2.5 text-text-muted focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
