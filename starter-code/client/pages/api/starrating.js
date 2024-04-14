import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL !== undefined
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}api/rate`
        : "http://localhost:8080/api/rate";

const RatingApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default RatingApi;
