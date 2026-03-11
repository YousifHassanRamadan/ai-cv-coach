import * as Yup from "yup";

export const feedbackValidationSchema = Yup.object({
  message: Yup.string().trim().required("Message is required"),
  rating: Yup.number().min(1, "Please select a rating").required(),
});
