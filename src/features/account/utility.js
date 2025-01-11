import * as Yup from "yup";

export const initialValues = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  password:"",
  cpassword:"",

  addressNo: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  postcode: "",
  metaData: {
    addressNo: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
  },
};

export const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long") // Example min length
    .required("Password is required"),

  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // Confirm password matches
    .required("Confirm password is required"),
});

export const continueAction = async (
  validateForm,
  pageHeaders,
  handleSubmit,
  setPage,
  page,
  setErrors
) => {
  const formErrors = await validateForm();
console.log('current page', page)
console.log('formErrors', formErrors)
  // Filter errors that are relevant to the current page
  const currentPageErrors = getCurrentPageErrors(formErrors, page);

  
  // If no errors on the current page, proceed to the next page
  if (Object.keys(currentPageErrors).length === 0) {
    if (pageHeaders.length > page + 1) {
      setErrors([]);
      setPage(page + 1); // Go to the next page
    } else {
      handleSubmit(); // On the last page, submit the form
    }
  } else {
    // Show validation errors for the current page
    const allErrorMessages = Object.values(currentPageErrors);
    setErrors(allErrorMessages);
    console.log("Page-specific validation errors:", currentPageErrors);
  }
};

export const getCurrentPageErrors = (formErrors, page) => {
  console.log("getCurrentPageErrors page", page);
  switch (page) {
    case 0:
      // Validation errors for the Auth page
      return pick(formErrors, ["email", "password", "cpassword"]);
    case 1:
      // Validation errors for the Bio page
      return pick(formErrors, ["fname", "lname", "dateOfBirth"]);
    case 2:
      // Validation errors for the Address page
      return pick(formErrors, [
        "addressNo",
        "address1",
        "city",
        "postcode",
        "country",
      ]);
    default:
      return {};
  }
};

// Helper function to pick fields from an object
export const pick = (obj, fields) => {
  return fields.reduce((acc, field) => {
    if (obj[field]) acc[field] = obj[field];
    return acc;
  }, {});
};
