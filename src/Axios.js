import axios from "axios";

const instance = axios.create({
  baseURL: "https://immense-citadel-13956.herokuapp.com/",
});

export default instance;
