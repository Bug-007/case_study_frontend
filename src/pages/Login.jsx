import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { AUTH, BASE_URL } from "../constants/API_ENDPOINTS";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slice/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate(); // Utilize useNavigate for navigation
  const dispatch = useDispatch();

  const [loginEror, setloginEror] = useState(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${BASE_URL + AUTH.POST_LOGIN}`,
          values
        );
        dispatch(loginSuccess(response?.data));
        localStorage.setItem('access-token', response?.data?.accessToken);
        localStorage.setItem('refresh-token', response?.data?.refreshToken);
        navigate("/products");
      } catch (err) {
        setloginEror(err?.response?.data?.error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              New user?{" "}
              <button
                className="text-blue-500 hover:text-blue-700 underline"
                onClick={() => navigate("/signup")} // Navigate to signup page
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
        {loginEror && (
          <div className="text-center text-red-500 text-xs mt-1">
            {loginEror}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
