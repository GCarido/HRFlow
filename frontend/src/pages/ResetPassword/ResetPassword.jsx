import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { TextInput, PasswordInput } from "@Components/FormInput";
import { ResetsPassword } from "../../services/authService.js";
import * as Yup from "yup";

const ResetPassword = () => {
  let navigate = useNavigate();
  let { state } = useLocation();
  let emailUse = state?.email;
  const formik = useFormik({
    initialValues: {
      email: emailUse,
      newPassword: "",
      confirmNewPassword: ""
    },
    onSubmit: (values) => {
      const ResetPass = async () => {
        try {
          const response = await ResetsPassword(values);
          if (!response.data) {
            sessionStorage.setItem("token", response.data);
            navigate("/dashboard", { state: { email: values.email } });
          }
        } catch (error) {
          console.log(error.response);
        }
      };
      ResetPass();
  
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email Address is required.")
        .email("Invalid Email Address")
        .min(4, "Email Address must be at least 4 characters.")
        .max(150, "Email Address can be at most 150 characters."),
      
      newPassword: Yup.string().required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .max(150, "Password can be at most 150 characters."),
      
      confirmNewPassword: Yup.string().required("Confirm Password is required.").oneOf([Yup.ref("newPassword"), null], "Passwords do not match.")
    })
  });

  return (
    <div className="mx-auto max-w-[24rem]">
      <div className="flex flex-col items-center">
        <header className="text-center mb-6">
          <h1 className="text-lato text-4xl font-bold my-2 sm:text-5xl">Reset Your Password</h1>
          <p className="text-poppins text-sm text-gray-600 sm:text-lg">You're almost there! Reset your password here.</p>
        </header>
        <form onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-5">

          <PasswordInput nameId="newPassword"
            name="Password"
            maxLength={150}
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            errors={formik.errors.newPassword}
            touched={formik.touched.newPassword}
            value={formik.values.newPassword} />

          <PasswordInput nameId="confirmNewPassword"
            name="Confirm Password"
            maxLength={150}
            type="password"
            placeholder="Re-enter Password"
            onChange={formik.handleChange}
            errors={formik.errors.confirmNewPassword}
            touched={formik.touched.confirmNewPassword}
            value={formik.values.confirmNewPassword} />

          <button type="submit"
            className="mt-2 bg-primary-light rounded-full h-14 text-poppins text-white font-semibold shadow-primary">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;