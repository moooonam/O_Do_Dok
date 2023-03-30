import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        withCredentials: true,
      'Content-Type': 'application/json',
    },
  });