import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import { spacing } from "@/theme";
import Button from "./Button";
import { IFormField } from "@/@types";
import FormField from "./FormField";

interface FormikFormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  submitButtonLabel: string;
  submitButtonState?: boolean;
  fields: IFormField[];
}

const FormikForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  fields,
  submitButtonLabel,
  submitButtonState,
}: FormikFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <View style={{ gap: spacing.small }}>
            {fields.map(({ label, name, value, type = "TEXT" }) => (
              <FormField
                key={name}
                label={label}
                name={name}
                value={values[name]}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                containerStyles={{ marginTop: spacing.small }}
                errors={errors}
                touched={touched}
                type={type}
              />
            ))}

            <Button
              title={submitButtonLabel}
              onPress={handleSubmit}
              containerStyles={{
                marginVertical: spacing.xLarge,
              }}
              variant="mediumBold"
              isLoading={submitButtonState}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default FormikForm;
