import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const GardenCurationForm = ({ onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    budget: Yup.number()
      .positive('Budget must be a positive number')
      .required('Budget is required'),
    gardenType: Yup.string().required('Garden type is required'),
    plantPreferences: Yup.array()
      .min(1, 'Please select at least one option')
      .required('Plant preferences are required'),
  });

  const initialValues = {
    name: '',
    email: '',
    budget: '',
    gardenType: '',
    plantPreferences: [],
  };

  const handleSubmit = (values) => {
    console.log(values); // Example: Log the form values
    // Perform necessary actions with the form values
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    handleSubmit(values);
    setSubmitting(false);
    onClose(); // Assuming you want to close the form after submission
  };

  const history = useHistory();

  const handleClose = () => {
    history.push('/');
  };

  return (
    <div className="garden-curation-form">
      <h2>Garden Curation Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
    >
        {({ isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="budget">Planned Budget:</label>
            <Field type="number" id="budget" name="budget" />
            <ErrorMessage name="budget" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="gardenType">Garden Type:</label>
            <Field as="select" id="gardenType" name="gardenType">
              <option value="">Select...</option>
              <option value="sunny">Sunny</option>
              <option value="shaded">Shaded</option>
              <option value="combination">Combination</option>
            </Field>
            <ErrorMessage
              name="gardenType"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label>Plant Preferences:</label>
            <div>
              <label>
                <Field
                  type="checkbox"
                  name="plantPreferences"
                  value="flowers"
                />
                Flowers
              </label>
            </div>
            <div>
              <label>
                <Field
                  type="checkbox"
                  name="plantPreferences"
                  value="vegetables"
                />
                Vegetables
              </label>
            </div>
            <div>
              <label>
                <Field
                  type="checkbox"
                  name="plantPreferences"
                  value="leafyPlants"
                />
                Leafy Plants
               </label>
            </div>
            <ErrorMessage
              name="plantPreferences"
              component="div"
              className="error"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button type="button" onClick={handleClose}>
              Close
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GardenCurationForm;

