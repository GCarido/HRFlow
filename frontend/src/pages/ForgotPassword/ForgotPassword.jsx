import { useState } from "react";
import { ModalBox } from "@Components/ModalBox";
import { TextInput, CodeInput } from "@Components/FormInput";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { LuMessagesSquare } from "react-icons/lu";
import ConfirmPassword from "@Pages/ConfirmPassword";
import { ForgotPassword } from "../../services/authService.js";
import * as Yup from "yup";

const ForgotPasswordMod = (prop) => {

    const [currentSection, setCurrentSection] = useState(1);
    const onSectionChange = (value) => setCurrentSection(value);

    return (
        <ModalBox onCancel={prop.onCancel}>
            {(currentSection === 1) ? (
                <FPEmailSection onSubmit={onSectionChange} />
            ) : (
                <FPCodeSection onSubmit={onSectionChange} />
            )}
        </ModalBox>
    );
};

const FPCodeSection = (prop) => {

    const formik = useFormik({
        initialValues: {
            code: ""
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Code is required.")
                .min(6, "Invalid Verification Code. Please enter again."),
        })
    });

    return (
        <>
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <LuMessagesSquare size={26} className="stroke-primary-light" />
                    <h1 className="text-3xl font-lato font-extrabold text-primary-light ">Confirm your Email</h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">We've sent a confirmation code to your email. Input the code to proceed.</p>
            </header>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                <span>
                    <TextInput nameId="otp"
                        name="6 Digit OTP"
                        type="text"
                        placeholder="123456"
                        maxLength={6}
                        errors={formik.errors.otp}
                        touched={formik.touched.otp}
                        onChange={formik.handleChange}
                        value={formik.values.otp} />

                    <div className="text-sm text-start text-red-500 font-semibold mt-2 sm:ml-7 ">
                        {formik.errors.otp && formik.touched.otp && formik.errors.otp}
                    </div>
                </span>

                <p className="font-poppins text-sm font-semibold text-secondary-light cursor-pointer max-w-max active-secondary">
                    Resend Verification
                </p>

                <button type="submit"
                    className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

const FPEmailSection = (prop) => {
    let { state } = useLocation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: (values) => {
            const VerifyEmail = async () => {
                try {
                    const response = await ForgotPassword(values);
                    sessionStorage.setItem("token", response.data);
                } catch (error) {
                    console.log(error.response);
                }
            };
            prop.onSubmit(2)
            navigate("/auth/confirm-password", { state: { email: values.email } });
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email Address is required.")
                .email("Invalid Email Address")
                .min(4, "Email Address must be at least 4 characters.")
                .max(150, "Email Address can be at most 150 characters.")
                .test(
                    'email-exists',
                    'Email does not exists. Please try again.',
                    async (value) => {
                        try {
                            const response = await ForgotPassword({ email: value });
                            if (response.data) {
                                return false;
                            }
                            return true;
                        } catch (error) {
                            console.log(error.response);
                            return false;
                        }
                    }
                ),
        })
    });

    return (
        <>
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <LuMessagesSquare size={26} className="stroke-primary-light" />
                    <h1 className="text-2xl sm:text-3xl font-lato font-extrabold text-primary-light ">Forgot your password?</h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">Don't worry, we just need your Email Address for confirmation.</p>
            </header>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 ">
                <TextInput nameId="email"
                    name="Email"
                    type="text"
                    placeholder="JohnDoe@example.com"
                    maxLength={150}
                    errors={formik.errors.email}
                    touched={formik.touched.email}
                    onChange={formik.handleChange}
                    value={formik.values.email} />

                <button type="submit"
                    className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary">
                    Proceed
                </button>
            </form>
        </>
    );
};





export default ForgotPasswordMod;