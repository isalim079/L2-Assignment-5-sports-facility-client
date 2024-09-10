import axios from "axios";

const baseURL = "https://assignment-3-i-salim079.vercel.app";

const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
