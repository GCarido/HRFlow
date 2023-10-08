import { forwardRef } from "react";
import ContactHand from "@Assets/svg/ContactHand.svg";
import PurpleGradient from "@Assets/svg/Contact_purple.svg";
import { useFormik } from "formik";
import { SendEmailToAdmin } from "../../../services/authService.js";
import * as Yup from "yup";

const Contact = forwardRef((props, ref) => {
    const formik = useFormik({
        initialValues: {
            email: "",
            subject: "",
            body: ""
        },
        onSubmit: async (values) => {
            try {
                const response = await SendEmailToAdmin(values);
            } catch (error){
                console.log(error.response);
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email Address is Required.")
                .email("Invalid Email Address")
                .min(3, "Email Address must be at least 3 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            subject: Yup.string().required("Email Subject is required.")
                .min(3, "Email Subject must be at least 3 characters.")
                .max(150, "Email Subject can be at most 150 characters."),
            body: Yup.string().required("Message Body is required.")
                .min(3, "Message Body must be at least 3 characters.")
                .max(150, "Message Body can be at most 150 characters."),

        })
    });


    return (
        <section ref={ref} className="flex items-center justify-center py-20 px-4 relative">
            <img
                src={PurpleGradient}
                className="absolute -z-10 top-10 -left-20 md:top-0 xl:-top-16 2xl:bottom-0 2xl:-left-100"
            />
            <div className="w-full max-w-screen-2xl mx-auto flex h-full gap-12">
                <div className="w-full hidden 2xl:block">
                    <img
                        src={ContactHand}
                        className="h-full mb-22 hidden 2xl:block"
                    />
                </div>
                <div className="w-full transition">
                    <h1 className="font-lato font-extrabold text-5xl text-jetblack py-3 mb-2 transition">
                        Contact Us
                    </h1>
                    <div className="bg-white text-xl font-poppins rounded-2xl shadow-lg py-8 px-5 border border-gray-100 transition">
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                            <div>
                                <input type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                />
                                <div className="text-start text-red-500 text-sm">
                                    {formik.errors.email && formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <div>
                                <input type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                />
                                <div className="text-start text-red-500 text-sm">
                                    {formik.errors.subject && formik.touched.subject && formik.errors.subject}
                                </div>
                            </div>
                            <div>
                                <textarea
                                    className="resize-none transition rounded-md p-4 bg-gray-100 w-full focus:border focus:border-gray-400 focus:outline-none font-normal h-52"
                                    placeholder="Message"
                                    name="body"
                                    value={formik.values.body}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="text-start text-red-500 text-sm">
                                    {formik.errors.body && formik.touched.body && formik.errors.body}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-secondary-light hover:bg-secondary-dark text-xl px-10 py-3 text-white font-semibold font-poppins rounded-lg shadow-lg">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Contact;