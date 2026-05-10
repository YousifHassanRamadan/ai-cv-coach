// FeedbackForm.tsx
import React, { useState } from "react";
import { Send, Loader2, Home } from "lucide-react";
import { useFormik } from "formik";
import type { Feedback, FeedbackFormData } from "../types";
import type { FeedbackFormProps } from "./feedback-form.types";
import StarRating from "../star-rating/star-rating";
import { feedbackValidationSchema } from "../../../../schema/feedback.schema";
import { useSendFeedback } from "../../../../api/feedback";
import { useNavigate, useNavigation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FeedbackForm: React.FC<FeedbackFormProps> = ({}) => {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const { mutate: sendFeedback, isPending: sendFeedbackLoading } =
    useSendFeedback();

  const formik = useFormik<FeedbackFormData>({
    initialValues: {
      message: "",
      rating: 0,
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form values:", values);
      sendFeedback(values, {
        onSuccess: () => {
          resetForm();
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000);
        },
      });
    },
  });

  const fieldClass = (field: keyof FeedbackFormData) =>
    `w-full bg-bg-input border rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-border-active transition-colors ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500"
        : "border-border"
    }`;

  return (
    <div className="bg-bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-5">
        {t("feedback.form.title")}
      </h2>

      {submitted && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-900/40 border border-green-800 text-green-400 text-sm">
          {t("feedback.form.success")}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
            {t("feedback.form.rating")}
          </label>
          <StarRating
            value={formik.values.rating}
            onChange={(r) => {
              formik.setFieldValue("rating", r);
              formik.setFieldTouched("rating", true);
            }}
          />
          {formik.touched.rating && formik.errors.rating && (
            <p className="text-xs text-red-400 mt-1">{formik.errors.rating}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
            {t("feedback.form.message")}
          </label>
          <textarea
            {...formik.getFieldProps("message")}
            placeholder={t("feedback.form.placeholder")}
            rows={4}
            className={`${fieldClass("message")} resize-none text-text-muted`}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-xs text-red-400 mt-1">{formik.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-bg-active hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-opacity"
        >
          {formik.isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {sendFeedbackLoading
            ? t("feedback.form.submitting")
            : t("feedback.form.submit")}
        </button>
      </form>
      <div className="my-3 w-full">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-bg-active hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-opacity"
        >
          <Home className="w-4 h-4" />
          {t("feedback.form.backHome")}
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
