import axios from "axios";
import { TEAM_URL } from "@Utils/constants.js";

const axiosInstance = (token) => axios.create({
    baseURL : TEAM_URL,
    headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
});


