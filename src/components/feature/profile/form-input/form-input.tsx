import type { FormInputProps } from "./form-input.types";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  fullWidth = false,
}: FormInputProps) => {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#13131a] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default FormInput;
