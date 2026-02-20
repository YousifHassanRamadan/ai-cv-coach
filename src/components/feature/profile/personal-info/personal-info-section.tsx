import FormInput from "../form-input/form-input";
import type {
  FieldConfig,
  PersonalInfoSectionProps,
} from "./personal-info.types";

const FIELDS: FieldConfig[] = [
  { label: "Full Name", name: "fullName" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone", name: "phone", type: "tel" },
  { label: "Location", name: "location" },
  { label: "Current Role", name: "currentRole", fullWidth: true },
];

const PersonalInfoSection = ({
  profile,
  onInputChange,
}: PersonalInfoSectionProps) => {
  return (
    <div className="bg-bg-card border-border-card rounded-xl border p-6 mb-6">
      <h3 className="text-lg font-semibold mb-6">Personal Information</h3>

      <div className="grid grid-cols-2 gap-6">
        {FIELDS.map(({ name, ...rest }) => (
          <FormInput
            key={name}
            name={name}
            value={profile[name]}
            onChange={onInputChange}
            {...rest}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
