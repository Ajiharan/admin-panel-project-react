import axios from "axios";

const defineMode = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:5000/";
  } else {
    return "https://immense-citadel-13956.herokuapp.com/";
  }
};

const instance = axios.create({
  baseURL: defineMode(),
});

export default instance;
