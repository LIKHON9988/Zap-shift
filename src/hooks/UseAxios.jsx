import axios from "axios";
import React from "react";

const axiosSequre = axios.create({
  baseURL: "https://zap-shift-server-sigma.vercel.app",
});

const UseAxios = () => {
  return axiosSequre;
};

export default UseAxios;
