import axios from "axios";
import { AUTH_URL } from "../utils/constants";

const axiosInstance = axios.create({
    baseURL : AUTH_URL,
    headers : {
        "Content-Type" : "application/json"
    }
});

export const RegisterUser = async (request) => {
    try {
        const response = await axiosInstance.post("/register", request);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const LoginUser = async (request) => {
    try {
        const response = await axiosInstance.post("/login", request);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const ForgotPassword = async (request) => {
    try {
        const response  = await axiosInstance.post("/forgot-password", request);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const VerifyPassword = async (request) => {
    try {
        const response = await axiosInstance.post("/forgot-password/verification", request);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const ResetsPassword = async (request) => {
    try {
        const response = await axiosInstance.put("/forgot-password/reset-password", request);
        return response.data;
    } catch (error) {
        return error.response;
    }
};


export const SendEmailToAdmin = async (request) => {
    try {
        const response = await axiosInstance.post("/send-email", request);
        return response.data;
    } catch (error){
        return error.response;
    }
}