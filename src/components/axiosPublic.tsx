import axios from "axios";

// baseUrl = http://localhost:5003
// baseUrl = https://nursery-website-server.vercel.app

const baseURL = "http://localhost:5003";

const axiosPublic = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosPublic;