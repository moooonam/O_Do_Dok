import axios from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers: {
        withCredentials: true,
      'Content-Type': 'application/json',
    },
  });