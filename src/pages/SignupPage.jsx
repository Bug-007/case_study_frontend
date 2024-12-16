import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH, BASE_URL } from '../constants/API_ENDPOINTS';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  fullname: Yup.string().required('Fullname is required'),
});

const SignupPage = () => {

  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState(null);

  const { 
    handleSubmit, 
    handleChange, 
    handleBlur, 
    values, 
    touched, 
    errors, 
    isValid, 
    dirty 
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${BASE_URL + AUTH.POST_SIGNUP}`,
          values
        );
        navigate("/");
      } catch (err) {
        setSignUpError(err?.response?.data?.error);
      }
    },
  });
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.fullname && touched.fullname && (
              <div className="text-red-500 text-xs mt-1">{errors.fullname}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={!(isValid && dirty)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Signup
          </button>
        </form>
        {signUpError && (
          <div className="text-center text-red-500 text-xs mt-1">
            {signUpError}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;