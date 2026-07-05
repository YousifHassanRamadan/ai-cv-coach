import React from "react";
import { useFormik } from "formik";

import { toast } from "sonner";
import * as Yup from "yup";
import type {
  PersonalInfoData,
  PersonalInfoFormProps,
} from "./personal-info.types";
import { ProfileSchema } from "../../../../schema/profile-info.schema";
import FormInput from "../form-input/form-input";
import SubmitButton from "../../form/submit-button/submit-button";
import { FIELDS } from "../../../../constants/profile/profile";
import { useUpdateMe } from "../../../../api/profile";
import { useTranslation } from "react-i18next";

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ profile }) => {
  const { t } = useTranslation();

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMe();

  const formik = useFormik<PersonalInfoData>({
    initialValues: {
      fName: profile.fName,
      lName: profile.lName,
      email: profile.email,
    },
    enableReinitialize: true,
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      // no changes
      if (!formik.dirty) {
        toast.info(t("profile2.form.noChanges"));
        return;
      }

      // invalid form
      if (!formik.isValid) {
        toast.error(t("profile2.form.invalidData"));
        return;
      }

      // console.log("Form submitted:", values);

      updateProfile(values, {
        onSuccess: () => {
          toast.success(t("profile2.form.updated"));
        },

        onError: () => {
          toast.error(t("profile2.form.updateFailed"));
        },
      });
    },
  });

  // console.log("profile:", profile);

  return (
    <form className="flex flex-col gap-5 my-5" onSubmit={formik.handleSubmit}>
      {FIELDS.map(({ name, label, type }) => (
        <FormInput
          key={name}
          name={name}
          label={t(label)}
          type={type}
          value={formik.values[name]}
          onChange={formik.handleChange}
          error={formik.errors[name] || ""}
        />
      ))}

      <SubmitButton
        type="submit"
        label={
          isUpdating ? t("profile2.form.submit") : t("profile2.form.submit")
        }
      />
    </form>
  );
};

export default PersonalInfoForm;
