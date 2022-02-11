import { useFormikContext } from "formik";

const FormikStatus = ({ err, successMessage }) => {
    const { submitCount, isSubmitting, isValid } = useFormikContext();
    if (submitCount > 0 && !isSubmitting && isValid) {
      if (err) {
        return (
          <div className="text-danger text-center">
            Something went wrong. Please try again later.
          </div>
        );
      }
      return <div className="text-blue text-center">{successMessage}</div>;
    }
    return "";
  };

  export default FormikStatus;