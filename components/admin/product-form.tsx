import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specifications: Array<{ name: string; value: string }>;
}

interface ProductFormProps {
  initialValues: Product;
  onSubmit: (values: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            {touched.name && errors.name && <div>{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" as="textarea" />
            {touched.description && errors.description && <div>{errors.description}</div>}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field name="price" type="number" />
            {touched.price && errors.price && <div>{errors.price}</div>}
          </div>

          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <Field name="imageUrl" type="text" />
            {touched.imageUrl && errors.imageUrl && <div>{errors.imageUrl}</div>}
          </div>

          <div>
            <label htmlFor="specifications">Specifications</label>
            <Field name="specifications" render={({ field }: { field: { name: string; value: string; onChange: (value: string) => void; onBlur: () => void } }) => (
              <div>
                {Array.isArray(field.value) ? (
                  field.value.map((spec: { name: string; value: string }, index: number) => (
                    <div key={index}>
                      <label htmlFor={`specifications[${index}].name`}>Specification Name</label>
                      <Field name={`specifications[${index}].name`} type="text" />

                      <label htmlFor={`specifications[${index}].value`}>Specification Value</label>
                      <Field name={`specifications[${index}].value`} type="text" />
                    </div>
                  ))
                ) : null}
              </div>
            )} />
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

// Removed defaultProps assignment as it's not supported for function components with TypeScript

export default ProductForm;
