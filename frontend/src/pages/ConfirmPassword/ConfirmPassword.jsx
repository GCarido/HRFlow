import { useState } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useFormik } from "formik";
import { TextInput, PasswordInput } from "@Components/FormInput";
import { VerifyPassword } from "../../services/authService.js";
import * as Yup from "yup";

const ConfirmPassword = () => {
   let { state } = useLocation();
   let emailUse = state?.email;
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         email: emailUse,
         code: ""
      },
      onSubmit: (values) => {
         const VerifyCode = async () => {
            try {
               const response = await VerifyPassword(values);
               if(!response.data){
                  sessionStorage.setItem("token", response.data);
                  navigate("/auth/reset-password", { state: { email: values.email } });
               }
            } catch (error) {
               console.log(error.response);
            }
         };
         VerifyCode();
      },
      validationSchema: Yup.object({
         email: Yup.string().required("Email Address is required.")
         .email("Invalid Email Address")
         .min(4, "Email Address must be at least 4 characters.")
         .max(150, "Email Address can be at most 150 characters."),

         code: Yup.string().required("Code is required.")
            .min(6, "Input 6 characters. Please enter again.")
      })
   });

   return (
      <div className="mx-auto max-w-[24rem]">
         <header className="mb-6">
            <span className="flex items-center gap-2">
               <LuMessagesSquare size={26} className="stroke-primary-light" />
               <h1 className="text-3xl font-lato font-extrabold text-primary-light ">Confirm your Email</h1>
            </span>
            <p className="font-poppins text-sm text-gray-600 mt-2">We've sent a confirmation code to your email. Input the code to proceed.</p>
         </header>
         <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5" >
            <span>
               <TextInput nameId="code"
                  name="6 Digit One-Time-Password"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  errors={formik.errors.code}
                  touched={formik.touched.code}
                  onChange={formik.handleChange}
                  value={formik.values.code} />

            </span>

            <p className="font-poppins text-sm font-semibold text-secondary-light cursor-pointer max-w-max active-secondary">
               Resend Verification
            </p>

            <button type="submit"
               className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary">
               Submit
            </button>
         </form>
      </div>
   );
};

export default ConfirmPassword;