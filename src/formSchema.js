import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("name is required!")
    .min(2, "name must be at least 2 characters"),
  address: yup.string().required("address is required"),
  size: yup.string(),
  special: yup.string(),
});

export default formSchema;
