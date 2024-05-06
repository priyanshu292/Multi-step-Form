import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC<{ onSubmit: (index: number) => void }> = ({ onSubmit }) => {
  const {state, setState} = useData() || { state: null, setState: () => {} };

  const { handleChange, errors, touched, handleBlur, handleSubmit, values, setFieldTouched,
    setFieldValue} =
    useFormik<IJobDetails>({
      initialValues: state?.jobDetails || {
        jobDetails: "",
        jobLocation: "",
        jobTitle: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        // Go to next step
        setState((prevState) => ({
          ...prevState,
          jobDetails: values,
        }));
        onSubmit(2);
      },
    });

  const movePrev = () => {
    onSubmit(0);
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setFieldTouched(name, true);
    setState((prevState) => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        [name]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChangeInput}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChangeInput}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChangeInput}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={movePrev}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
